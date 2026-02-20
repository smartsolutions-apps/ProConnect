
import React, { useState, useMemo } from 'react';
import { Filter, Search } from 'lucide-react';
import { JobCard } from './JobCard';
import { SmartApplyModal } from './SmartApplyModal';
import { SearchableDropdown } from '../../components/common/SearchableDropdown';
import { MultiSelectDropdown } from '../../components/common/MultiSelectDropdown';
import { LOCATIONS, CURRENT_USER } from '../../data';
import { Job, JobType } from '../../types';
import { useHydratedData } from '../../context/DataHydrationContext';

import { useNavigate, useParams } from 'react-router-dom';
import { JobFilterBar } from './JobFilterBar';
import { JobDetailView } from './JobDetailView';

// ...

export const JobBoard: React.FC = () => {
  const { jobs: hydratedJobs, companies: hydratedCompanies } = useHydratedData();
  const navigate = useNavigate();
  const { slug, lang = 'en' } = useParams<{ slug: string; lang: string }>();

  // Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Locations');
  const [selectedCompany, setSelectedCompany] = useState('All Companies');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [easyApplyOnly, setEasyApplyOnly] = useState(false);

  // Smart Apply State
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Derived Data for Filters
  const uniqueCompanies = useMemo(() => {
    const companies = new Set(hydratedJobs.map(j => j.companyName).filter(Boolean));
    return ['All Companies', ...Array.from(companies).sort()];
  }, [hydratedJobs]);

  const uniqueIndustries = useMemo(() => {
    const industries = new Set<string>();
    hydratedJobs.forEach(job => {
      const company = hydratedCompanies.find(c => c.name === job.companyName || c.id === job.companyId);
      if (company?.industry) industries.add(company.industry);
    });
    return ['All Industries', ...Array.from(industries).sort()];
  }, [hydratedJobs, hydratedCompanies]);

  // Sync selected job with URL slug
  React.useEffect(() => {
    if (slug && hydratedJobs.length > 0) {
      const job = hydratedJobs.find(j => j.slug === slug);
      if (job) setSelectedJob(job);
    }
  }, [slug, hydratedJobs]);

  const filteredJobs = useMemo(() => {
    return hydratedJobs.filter(job => {
      // 1. Safety Filter
      if (job.isHidden) return false;

      // 2. Search Term (Title, Company, or Skills)
      const safeSearch = searchTerm.toLowerCase().trim();
      const matchesSearch = safeSearch === '' ||
        (job.title && job.title.toLowerCase().includes(safeSearch)) ||
        (job.companyName && job.companyName.toLowerCase().includes(safeSearch)) ||
        (job.skills && job.skills.some(skill => skill.toLowerCase().includes(safeSearch)));

      // 3. City Filter
      const matchesCity = selectedCity === 'All Locations' || job.location.includes(selectedCity);

      // 4. Company Filter
      const matchesCompany = selectedCompany === 'All Companies' || job.companyName === selectedCompany;

      // 5. Industry Filter
      let matchesIndustry = true;
      if (selectedIndustry !== 'All Industries') {
        const company = hydratedCompanies.find(c => c.name === job.companyName || c.id === job.companyId);
        matchesIndustry = company?.industry === selectedIndustry;
      }

      // 6. Existing Filters
      const matchesType = selectedJobTypes.length > 0 ? selectedJobTypes.includes(job.type) : true;
      const matchesEasyApply = easyApplyOnly ? job.isEasyApply : true;

      return matchesSearch && matchesCity && matchesCompany && matchesIndustry && matchesType && matchesEasyApply;
    });
  }, [hydratedJobs, hydratedCompanies, searchTerm, selectedCity, selectedCompany, selectedIndustry, selectedJobTypes, easyApplyOnly]);

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    navigate(`/${lang}/jobs/${job.slug}`);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
      {/* Feature 1: Compact Filter Bar */}
      <JobFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
        selectedJobTypes={selectedJobTypes}
        setSelectedJobTypes={setSelectedJobTypes}
        easyApplyOnly={easyApplyOnly}
        setEasyApplyOnly={setEasyApplyOnly}
        availableCompanies={uniqueCompanies}
        availableIndustries={uniqueIndustries}
      />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 pt-4 pb-0 overflow-hidden">
        {/* Feature 2: Split Screen Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">

          {/* Left Column: Job List (Scrollable) */}
          <div className={`
            col-span-1 md:col-span-5 lg:col-span-4 h-full overflow-y-auto custom-scrollbar pr-2 pb-20 
            ${selectedJob ? 'hidden md:block' : 'block'}
          `}>
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-[#1e1e1e] rounded-xl border border-gray-100 dark:border-[#333333]">
                <Search className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No jobs found</h3>
                <p className="text-sm text-gray-500 mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              filteredJobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  userLocation={CURRENT_USER.location}
                  onApply={() => handleJobSelect(job)}
                  onClick={() => handleJobSelect(job)}
                  compact={true}
                  isSelected={selectedJob?.id === job.id}
                />
              ))
            )}
          </div>

          {/* Right Column: Detail View (Sticky/Fixed) */}
          <div className={`
            col-span-1 md:col-span-7 lg:col-span-8 h-full 
            ${selectedJob ? 'block' : 'hidden md:block'}
          `}>
            {/* Mobile Back Button */}
            <button
              onClick={() => setSelectedJob(null)}
              className="md:hidden mb-4 flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-medium transition-colors"
            >
              <div className="p-1 rounded-full bg-slate-100 dark:bg-[#333]">
                <Search className="w-4 h-4 rotate-90" />
              </div>
              Back to Jobs
            </button>

            <JobDetailView
              key={selectedJob?.id} // Forces re-render on job switch to fix stale logo bug
              job={selectedJob}
              onApply={handleApplyClick}
              userLocation={CURRENT_USER.location}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedJob && (
        <SmartApplyModal
          job={selectedJob}
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
        />
      )}
    </div>
  );
};
