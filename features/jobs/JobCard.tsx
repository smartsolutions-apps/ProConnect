
import React from 'react';
import { MapPin, Building2, Zap, Timer, CheckCircle2, ArrowRight } from 'lucide-react';
import { Job, JobType } from '../../types';
import { useHydratedData } from '../../context/DataHydrationContext';

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
  userLocation?: string;
}

const BRANDFETCH_CLIENT_ID = "1idiSqP5yegNdsQZndZ";
const FALLBACK_LOGO = "https://ui-avatars.com/api/?name=Real+Estate&background=0D8ABC&color=fff&rounded=true&bold=true";

export const JobCard: React.FC<JobCardProps> = ({ job, onApply, userLocation }) => {
  const { companies } = useHydratedData();
  const isTemp = job.type === JobType.TEMPORARY || job.type === JobType.INTERNSHIP;
  const isDirectOffer = job.isDirectOffer;

  // Resolve company domain for Brandfetch Logo
  const company = companies.find(c => c.id === job.companyId || c.name === job.companyName);
  const domain = company?.domain || job.companyName.toLowerCase().replace(/\s/g, '') + '.com';
  
  // Brandfetch URL Structure
  const logoUrl = `https://cdn.brandfetch.io/domain/${domain}?c=${BRANDFETCH_CLIENT_ID}`;

  return (
    <div className={`bg-white dark:bg-[#1e1e1e] rounded-2xl p-6 border transition-all duration-300 group mb-4 ${
        isDirectOffer ? 'border-amber-300 dark:border-amber-900 shadow-amber-100 dark:shadow-none bg-amber-50/30 dark:bg-amber-900/10' : 
        'border-slate-200 dark:border-[#2c2c2c] hover:border-blue-200 dark:hover:border-blue-900 shadow-sm hover:shadow-lg'
    }`}>
      
      <div className="flex items-start gap-5">
        {/* Company Identity */}
        <div className="w-14 h-14 rounded-2xl border border-slate-100 dark:border-[#333333] overflow-hidden flex-shrink-0 bg-white dark:bg-[#2d2d2d] shadow-sm p-2 flex items-center justify-center">
          <img 
            src={logoUrl} 
            alt={job.companyName} 
            className="w-full h-full object-contain" 
            onError={(e) => { e.currentTarget.src = FALLBACK_LOGO; }}
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-black text-lg text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                {job.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5">
                {job.companyName}
                {job.isEasyApply && <CheckCircle2 size={14} className="text-blue-500" />}
              </p>
            </div>
            
            {isDirectOffer && (
              <span className="flex-shrink-0 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter border border-amber-200 dark:border-amber-800">
                Direct Offer
              </span>
            )}
          </div>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-[13px] text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5"><MapPin size={16} className="text-slate-400" /> {job.location.split(',')[0]}</span>
            <span className="flex items-center gap-1.5"><Building2 size={16} className="text-slate-400" /> {job.type}</span>
            {job.salaryRange && (
              <span className="font-bold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-md">
                {job.salaryRange}
              </span>
            )}
            {userLocation && userLocation !== job.location && (
               <span className="text-[11px] text-slate-400 hidden sm:inline">
                 • Near {userLocation.split(',')[0]}
               </span>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-[#2c2c2c] flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Timer size={12} /> {job.postedAt} • {job.applicantsCount} Applied
            </span>

            <button 
              onClick={() => onApply(job)}
              className={`px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-md flex items-center gap-2 ${
                isDirectOffer 
                  ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-200 dark:shadow-none' 
                  : isTemp 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-200' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400'
              }`}
            >
              {isDirectOffer ? 'Claim Offer' : isTemp ? 'Gig Apply' : 'Quick Apply'}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
