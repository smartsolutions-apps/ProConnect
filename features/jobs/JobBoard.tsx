
import React, { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import { JobCard } from './JobCard';
import { SmartApplyModal } from './SmartApplyModal';
import { SearchableDropdown } from '../../components/common/SearchableDropdown';
import { MultiSelectDropdown } from '../../components/common/MultiSelectDropdown';
import { JOBS, LOCATIONS, CURRENT_USER } from '../../data';
import { Job, JobType } from '../../types';

export const JobBoard: React.FC = () => {
  const [jobs] = useState<Job[]>(JOBS);
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [easyApplyOnly, setEasyApplyOnly] = useState(false);
  
  // Smart Apply State
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const filteredJobs = jobs.filter(job => {
    const matchesLocation = locationFilter ? job.location.includes(locationFilter) : true;
    const matchesType = selectedJobTypes.length > 0 ? selectedJobTypes.includes(job.type) : true;
    const matchesEasyApply = easyApplyOnly ? job.isEasyApply : true;
    return matchesLocation && matchesType && matchesEasyApply;
  });

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  return (
    <div className="space-y-4">
       {/* Job Filters */}
       <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4 sticky top-20 z-10">
          <div className="flex items-center gap-2 mb-3">
            <Filter size={16} className="text-gray-500" />
            <span className="text-xs font-bold uppercase text-gray-500">Quick Filters</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
             <div className="w-full sm:w-56">
               <SearchableDropdown 
                  options={LOCATIONS.map(l => l.split(',')[0])} 
                  value={locationFilter} 
                  onChange={setLocationFilter}
                  placeholder="All Locations"
               />
             </div>
             
             <div className="w-full sm:w-64">
               <MultiSelectDropdown 
                  options={Object.values(JobType)}
                  selectedValues={selectedJobTypes}
                  onChange={setSelectedJobTypes}
                  placeholder="Job Type"
               />
             </div>

             <button 
               onClick={() => setEasyApplyOnly(!easyApplyOnly)}
               className={`px-3 py-2 text-sm border rounded-lg whitespace-nowrap transition-colors ${easyApplyOnly ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}
             >
               Easy Apply Only
             </button>
          </div>
       </div>

       {filteredJobs.length === 0 ? (
         <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
           <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
           <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
           <p className="text-gray-500">Try adjusting your filters.</p>
           {(locationFilter || selectedJobTypes.length > 0 || easyApplyOnly) && (
              <button 
                onClick={() => {
                  setLocationFilter('');
                  setSelectedJobTypes([]);
                  setEasyApplyOnly(false);
                }}
                className="mt-3 text-sm text-brand-600 font-medium hover:underline"
              >
                Clear all filters
              </button>
           )}
         </div>
       ) : (
         filteredJobs.map(job => (
           <JobCard 
                key={job.id} 
                job={job} 
                userLocation={CURRENT_USER.location}
                onApply={handleApplyClick} 
           />
         ))
       )}

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
