
import React, { useState } from 'react';
import { Clock, CheckCircle2, Circle, AlertCircle, XCircle, Trophy, Send, Sparkles, X, ShieldCheck } from 'lucide-react';
import { Application, ApplicationStatus } from '../../types';

interface ApplicationCardProps {
  application: Application;
}

const TIMELINE_STEPS = [
  ApplicationStatus.APPLIED,
  ApplicationStatus.VIEWED,
  ApplicationStatus.SHORTLISTED,
  ApplicationStatus.INTERVIEW
];

export const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  const [nudged, setNudged] = useState(false);
  const [showNudgeModal, setShowNudgeModal] = useState(false);

  // Logic for Special States
  const isRejected = application.status === ApplicationStatus.REJECTED;
  const isOffer = application.status === ApplicationStatus.OFFER;

  // Determine current step index for visual timeline
  const currentStepIndex = TIMELINE_STEPS.indexOf(application.status as ApplicationStatus);
  
  // Calculate Progress Display Index
  let displayIndex = currentStepIndex;
  if (isOffer) {
    displayIndex = TIMELINE_STEPS.length - 1; // Show full progress
  } else if (isRejected || currentStepIndex === -1) {
    displayIndex = 0; 
  }

  // Calculate Nudge Eligibility
  const lastUpdateDate = new Date(application.lastUpdateDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - lastUpdateDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isSilence = diffDays > 5;
  const canNudge = isSilence && !nudged && !isRejected && !isOffer;

  const handleSendNudge = () => {
    setNudged(true);
    setShowNudgeModal(false);
  };

  const getStatusBadge = () => {
    if (isOffer) return <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-emerald-200 dark:border-emerald-800"><Trophy size={12}/> Offer Received</span>;
    if (isRejected) return <span className="px-3 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-rose-200 dark:border-rose-800"><XCircle size={12}/> Rejected</span>;
    return <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-wider border border-indigo-100 dark:border-indigo-800">{application.status}</span>;
  };

  return (
    <>
      <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-sm border border-slate-100 dark:border-[#333333] p-6 mb-4 hover:shadow-md transition-all group">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Header Info */}
          <div className="flex gap-5">
            <div className="w-16 h-16 rounded-2xl border border-slate-100 dark:border-[#333333] p-2 bg-white dark:bg-[#2d2d2d] flex-shrink-0 shadow-sm">
                <img src={application.companyLogo} alt="" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-1.5">
                  <h3 className="font-black text-slate-900 dark:text-white text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{application.jobTitle}</h3>
                  {getStatusBadge()}
                  {/* SIMULATED: Show that this application includes Gold Verified Status */}
                  <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-lg border border-amber-200 dark:border-amber-900/50" title="Skills Verified for this role">
                    <ShieldCheck size={12} className="text-amber-600 dark:text-amber-400" />
                    <span className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase">Verified</span>
                  </div>
              </div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{application.companyName}</p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 flex items-center gap-1.5 font-bold uppercase tracking-wider">
                <Clock size={12} /> {application.lastUpdate}
              </p>
            </div>
          </div>

          {/* Nudge Action */}
          <div className="flex items-start justify-end">
            {canNudge ? (
              <button 
                onClick={() => setShowNudgeModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-amber-200 dark:shadow-none"
              >
                <AlertCircle size={14} />
                Nudge HR
              </button>
            ) : nudged ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                <CheckCircle2 size={14} /> Followed Up
              </div>
            ) : null}
          </div>
        </div>

        {/* Visual Timeline */}
        <div className="mt-10 relative px-4">
          <div className="absolute top-4 left-4 right-4 h-1 bg-slate-100 dark:bg-[#333333] -z-0 rounded-full"></div>
          <div 
              className={`absolute top-4 left-4 h-1 -z-0 transition-all duration-1000 ease-out rounded-full shadow-[0_0_8px_rgba(79,70,229,0.4)] ${isRejected ? 'bg-rose-400' : isOffer ? 'bg-emerald-500' : 'bg-indigo-600'}`}
              style={{ 
                  width: isOffer ? 'calc(100% - 32px)' : `${(displayIndex / (TIMELINE_STEPS.length - 1)) * 100}%` 
              }}
          ></div>

          <div className="flex justify-between relative z-10">
            {TIMELINE_STEPS.map((step, index) => {
              let isActive = index === displayIndex;
              let isCompleted = index <= displayIndex || isOffer;

              return (
                <div key={step} className="flex flex-col items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-4 transition-all duration-500 bg-white dark:bg-[#1e1e1e] ${
                      isOffer 
                          ? 'border-emerald-500 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                          : isRejected && isActive
                              ? 'border-rose-500 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                              : isActive 
                                  ? 'border-indigo-600 text-indigo-600 scale-125 shadow-[0_0_15px_rgba(79,70,229,0.3)]'
                                  : isCompleted 
                                      ? 'border-indigo-600 text-indigo-600' 
                                      : 'border-slate-100 dark:border-[#333333] text-slate-300'
                    }`}
                  >
                    {isOffer ? <Trophy size={14} /> : 
                     isRejected && isActive ? <XCircle size={14} /> :
                     isCompleted ? <CheckCircle2 size={16} /> : 
                     <Circle size={8} strokeWidth={4} />}
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest mt-3 transition-colors ${
                      isActive ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'
                  }`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Nudge Modal */}
      {showNudgeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-200 dark:border-[#333333]">
             <div className="bg-amber-50 dark:bg-amber-900/20 p-6 border-b border-amber-100 dark:border-amber-900/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-amber-500 rounded-xl text-white">
                    <Sparkles size={20} />
                   </div>
                   <h3 className="font-black text-amber-900 dark:text-amber-400">Concierge Follow-up</h3>
                </div>
                <button onClick={() => setShowNudgeModal(false)} className="text-amber-700 dark:text-amber-500 hover:bg-amber-100 dark:hover:bg-amber-900/30 p-2 rounded-full transition-colors"><X size={20} /></button>
             </div>
             
             <div className="p-8">
                <h4 className="text-slate-900 dark:text-white font-black text-lg mb-2">Restore Visibility</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                   Your profile has been silent for {diffDays} days. I've prepared a professional re-engagement message highlighting your <strong>verified skills</strong>.
                </p>

                <div className="bg-slate-50 dark:bg-[#2d2d2d] border border-slate-200 dark:border-[#333333] rounded-2xl p-4 mb-8">
                   <p className="text-[10px] text-slate-400 font-black uppercase mb-3 border-b border-slate-100 dark:border-[#333333] pb-2">Drafted Message</p>
                   <div className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                      "I wanted to briefly reiterate my strong interest in the <strong>{application.jobTitle}</strong> position. Since applying, I've completed technical verification in core React patterns..."
                   </div>
                </div>

                <div className="flex gap-4">
                   <button 
                      onClick={() => setShowNudgeModal(false)}
                      className="flex-1 py-4 text-slate-500 dark:text-slate-400 font-black uppercase text-[11px] tracking-widest hover:bg-slate-50 dark:hover:bg-[#2d2d2d] rounded-2xl transition-colors"
                   >
                      Cancel
                   </button>
                   <button 
                      onClick={handleSendNudge}
                      className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-[11px] tracking-widest rounded-2xl shadow-xl shadow-indigo-100 dark:shadow-none flex items-center justify-center gap-2 transition-all active:scale-95"
                   >
                      <Send size={14} /> Send Now
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </>
  );
};
