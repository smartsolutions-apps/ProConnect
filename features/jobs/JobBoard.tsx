
import React, { useState, useMemo } from 'react';
import { Filter, Search } from 'lucide-react';
import { JobCard } from './JobCard';
import { SmartApplyModal } from './SmartApplyModal';
import { SearchableDropdown } from '../../components/common/SearchableDropdown';
import { MultiSelectDropdown } from '../../components/common/MultiSelectDropdown';
import { LOCATIONS, CURRENT_USER } from '../../data';
import { Job, JobType } from '../../types';
import { useHydratedData } from '../../context/DataHydrationContext';

export const JobBoard: React.FC = () => {
  const { jobs: hydratedJobs } = useHydratedData();
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [easyApplyOnly, setEasyApplyOnly] = useState(false);
  
  // Smart Apply State
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const filteredJobs = useMemo(() => {
    return hydratedJobs.filter(job => {
      const matchesLocation = locationFilter ? job.location.toLowerCase().includes(locationFilter.toLowerCase()) : true;
      const matchesType = selectedJobTypes.length > 0 ? selectedJobTypes.includes(job.type) : true;
      const matchesEasyApply = easyApplyOnly ? job.isEasyApply : true;
      return matchesLocation && matchesType && matchesEasyApply;
    });
  }, [hydratedJobs, locationFilter, selectedJobTypes, easyApplyOnly]);

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  return (
    <div className="space-y-4">
       {/* Job Filters */}
       <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-4 shadow-sm border border-gray-100 dark:border-[#333333] mb-4 sticky top-20 z-10 transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <Filter size={16} className="text-gray-500 dark:text-gray-400" />
            <span className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400">Quick Filters</span>
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
               className={`px-3 py-2 text-sm border rounded-lg whitespace-nowrap transition-colors ${easyApplyOnly ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 font-medium' : 'bg-gray-50 dark:bg-[#2d2d2d] border-gray-200 dark:border-[#333333] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3d3d3d]'}`}
             >
               Easy Apply Only
             </button>
          </div>
       </div>

       {filteredJobs.length === 0 ? (
         <div className="text-center py-12 bg-white dark:bg-[#1e1e1e] rounded-xl border border-gray-100 dark:border-[#333333]">
           <Search className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
           <h3 className="text-lg font-medium text-gray-900 dark:text-white">No jobs found</h3>
           <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters.</p>
           {(locationFilter || selectedJobTypes.length > 0 || easyApplyOnly) && (
              <button 
                onClick={() => {
                  setLocationFilter('');
                  setSelectedJobTypes([]);
                  setEasyApplyOnly(false);
                }}
                className="mt-3 text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
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
