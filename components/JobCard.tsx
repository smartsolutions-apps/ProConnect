import React from 'react';
import { MapPin, Clock, Building2, Wallet, Zap } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onApply: (id: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApply }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200 group">
      <div className="flex gap-4">
        {/* Company Logo */}
        <div className="flex-shrink-0">
          <img 
            src={job.companyLogo} 
            alt={job.companyName} 
            className="w-12 h-12 rounded-lg object-cover border border-gray-100"
          />
        </div>

        {/* Job Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors truncate">
                {job.title}
              </h3>
              <p className="text-sm text-gray-600 font-medium">{job.companyName}</p>
            </div>
            {job.isEasyApply && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md whitespace-nowrap">
                <Zap size={12} className="fill-blue-700" />
                Easy Apply
              </span>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <MapPin size={16} className="text-gray-400" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building2 size={16} className="text-gray-400" />
              <span>{job.type}</span>
            </div>
            {job.salaryRange && (
              <div className="flex items-center gap-1.5 text-green-700 font-medium bg-green-50 px-2 py-0.5 rounded">
                <Wallet size={14} />
                <span>{job.salaryRange}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Clock size={16} className="text-gray-400" />
              <span>{job.postedAt}</span>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              {job.applicantsCount} applicants
            </span>
            <button 
              onClick={() => onApply(job.id)}
              className="px-4 py-1.5 bg-white border border-brand-600 text-brand-600 text-sm font-medium rounded-full hover:bg-brand-50 transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};