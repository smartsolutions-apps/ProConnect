
import React from 'react';
import { MapPin, Building2, Zap, Timer, CheckCircle2, ArrowRight, Hourglass, Star, Crown, AlertTriangle } from 'lucide-react';
import { Job, JobType } from '../../types';
import { CURRENT_USER } from '../../data';

interface JobCardProps {
  job: Job;
  userLocation: string;
  onApply: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApply }) => {
  // Parsing Salary for visual display
  const isHighSalary = job.salaryRange?.includes('k') && parseInt(job.salaryRange) > 50;
  
  // Pivot Logic: Urgent/Temp Jobs get distinct styling
  const isTemp = job.type === JobType.TEMPORARY || job.type === JobType.INTERNSHIP;
  const isDirectOffer = job.isDirectOffer;

  // Check for Skill Gaps (Simulated check against User Insights)
  const skillGap = CURRENT_USER.skillInsights?.find(si => si.jobId === job.id);

  return (
    <div className={`bg-white rounded-2xl p-5 border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden ${
        isDirectOffer ? 'border-yellow-300 bg-gradient-to-br from-white to-yellow-50' : 
        isTemp ? 'border-amber-200 bg-amber-50/10' : 
        'border-gray-100'
    }`}>
      
      {/* Top Decoration Line */}
      <div className={`absolute top-0 left-0 w-full h-1 ${
          isDirectOffer ? 'bg-gradient-to-r from-yellow-400 to-amber-500' :
          isTemp ? 'bg-amber-400' : 
          isHighSalary ? 'bg-gradient-to-r from-green-400 to-emerald-600' : 
          'bg-transparent'
      }`}></div>

      {isDirectOffer && (
          <div className="mb-3 flex items-center gap-2">
              <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 border border-yellow-200">
                  <Crown size={12} className="fill-yellow-600 text-yellow-600"/> DIRECT OFFER
              </span>
              <span className="text-xs text-yellow-700 font-medium">You were hand-picked for this role!</span>
          </div>
      )}

      {/* SKILL GAP WARNING (INLINE HINT) */}
      {skillGap && (
          <div className="mb-3 flex items-start gap-2 bg-red-50 p-2 rounded-lg border border-red-100">
              <AlertTriangle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                  <p className="text-xs font-bold text-red-700">Missing Skills Detected</p>
                  <p className="text-[10px] text-red-600 leading-tight">
                      You are missing <strong>{skillGap.missingSkills[0]}</strong>. 
                      Match Score: {skillGap.matchScore}%
                  </p>
              </div>
          </div>
      )}

      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="w-14 h-14 rounded-xl border border-gray-100 overflow-hidden flex-shrink-0 bg-white shadow-sm">
          <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-contain p-1" />
        </div>

        {/* Header Info */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
               <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-brand-600 transition-colors truncate pr-4">
                 {job.title}
               </h3>
               <p className="text-sm font-medium text-gray-500 mt-1 flex items-center gap-1.5">
                  {job.companyName}
                  {job.isEasyApply && !isDirectOffer && <CheckCircle2 size={12} className="text-blue-500" />}
               </p>
            </div>
            {isTemp ? (
                <span className="flex-shrink-0 text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded-full whitespace-nowrap flex items-center gap-1">
                   <Hourglass size={10} /> Urgent
                </span>
            ) : job.postedAt.includes('h') && (
                <span className="flex-shrink-0 text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded-full whitespace-nowrap">
                   New
                </span>
            )}
          </div>
        </div>
      </div>

      {/* Badge Cloud (Progressive Disclosure: Info instead of Text) */}
      <div className="mt-5 flex flex-wrap gap-2">
         {/* Location Badge */}
         <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 text-xs font-medium text-gray-600 border border-gray-100">
            <MapPin size={12} className="text-gray-400" />
            {job.location.split(',')[0]}
         </div>
         
         {/* Type Badge - Special Color for Temp/Intern */}
         <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${isTemp ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-gray-50 text-gray-600 border-gray-100'}`}>
            <Building2 size={12} className={isTemp ? "text-amber-600" : "text-gray-400"} />
            {job.type}
         </div>

         {/* Salary Badge (Highlighted) */}
         {job.salaryRange && (
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${isDirectOffer ? 'bg-green-100 text-green-800 border-green-200' : 'bg-green-50 text-green-700 border-green-100'}`}>
                {job.salaryRange}
            </div>
         )}
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between gap-3">
         <div className="text-xs text-gray-400 font-medium flex items-center gap-1">
            <Timer size={12} /> {job.postedAt} • {job.applicantsCount} applicants
         </div>

         <div className="flex gap-2">
            {isDirectOffer ? (
                <button 
                  onClick={() => onApply(job)}
                  className="pl-3 pr-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-bold rounded-xl active:scale-95 transition-all shadow-md shadow-yellow-200 flex items-center gap-1.5"
                >
                  <Star size={14} className="fill-white" /> Accept Offer
                </button>
            ) : job.isEasyApply ? (
                <button 
                  onClick={() => onApply(job)}
                  className={`pl-3 pr-4 py-2 text-white text-xs font-bold rounded-xl active:scale-95 transition-all shadow-md flex items-center gap-1.5 ${isTemp ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-200' : 'bg-brand-600 hover:bg-brand-700 shadow-brand-200'}`}
                >
                  <Zap size={14} className="fill-white" /> {isTemp ? 'Gig Apply' : '1-Click Apply'}
                </button>
            ) : (
                <button 
                  onClick={() => onApply(job)}
                  className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-gray-800 transition-all flex items-center gap-2"
                >
                  Apply <ArrowRight size={12} />
                </button>
            )}
         </div>
      </div>
    </div>
  );
};
