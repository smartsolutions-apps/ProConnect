
import React, { useState } from 'react';
import { Clock, CheckCircle2, Circle, AlertCircle, XCircle, Trophy, Send, Sparkles, X } from 'lucide-react';
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
    // If rejected, default to start to avoid showing false progress
    displayIndex = 0; 
  }

  // Calculate Nudge Eligibility (5 days INACTIVITY from last update)
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
    if (isOffer) return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1"><Trophy size={12}/> Offer Received</span>;
    if (isRejected) return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold flex items-center gap-1"><XCircle size={12}/> Application Rejected</span>;
    return <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">{application.status}</span>;
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4 hover:shadow-md transition-all">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Header Info */}
          <div className="flex gap-4">
            <img 
              src={application.companyLogo} 
              alt={application.companyName} 
              className="w-12 h-12 rounded-lg object-cover border border-gray-100"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900">{application.jobTitle}</h3>
                  {getStatusBadge()}
              </div>
              <p className="text-sm text-gray-600 font-medium">{application.companyName}</p>
              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                <Clock size={12} /> Last update: {application.lastUpdate}
              </p>
            </div>
          </div>

          {/* Nudge Action */}
          <div className="flex items-start justify-end">
            {canNudge ? (
              <button 
                onClick={() => setShowNudgeModal(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg hover:bg-amber-100 border border-amber-200 transition-colors shadow-sm"
              >
                <AlertCircle size={14} />
                Nudge HR ({diffDays} days silent)
              </button>
            ) : nudged ? (
              <button 
                disabled
                className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-lg border border-green-200 opacity-75 cursor-not-allowed"
              >
                <CheckCircle2 size={14} /> AI Follow-up Sent
              </button>
            ) : null}
          </div>
        </div>

        {/* Visual Timeline */}
        <div className="mt-8 relative px-2">
          {/* Progress Line Background */}
          <div className="absolute top-3 left-2 right-2 h-0.5 bg-gray-100 -z-0"></div>
          
          {/* Active Progress Line */}
          <div 
              className={`absolute top-3 left-2 h-0.5 -z-0 transition-all duration-1000 ease-out ${isRejected ? 'bg-red-400' : isOffer ? 'bg-green-500' : 'bg-brand-500'}`}
              style={{ 
                  width: isOffer ? 'calc(100% - 16px)' : `${(displayIndex / (TIMELINE_STEPS.length - 1)) * 100}%` 
              }}
          ></div>

          <div className="flex justify-between relative z-10">
            {TIMELINE_STEPS.map((step, index) => {
              let isActive = false;
              let isCompleted = false;

              if (isOffer) {
                  isCompleted = true;
              } else if (isRejected) {
                   // If rejected, only the first step is strictly "completed" unless we track history
                   isCompleted = index === 0; 
                   isActive = index === 0;
              } else {
                  isCompleted = index <= displayIndex;
                  isActive = index === displayIndex;
              }

              return (
                <div key={step} className="flex flex-col items-center group">
                  <div 
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors duration-300 bg-white ${
                      isOffer 
                          ? 'border-green-500 text-green-500' 
                          : isRejected && isActive
                              ? 'border-red-500 text-red-500'
                              : isActive 
                                  ? 'border-brand-600 text-brand-600 shadow-[0_0_0_3px_rgba(14,165,233,0.2)]'
                                  : isCompleted 
                                      ? 'border-brand-500 text-brand-500 bg-brand-50' 
                                      : 'border-gray-200 text-gray-300'
                    }`}
                  >
                    {isOffer ? <CheckCircle2 size={14} className="fill-green-100" /> : 
                     isRejected && isActive ? <XCircle size={14} className="fill-red-50" /> :
                     isCompleted ? <CheckCircle2 size={14} /> : 
                     <Circle size={10} strokeWidth={3} />}
                  </div>
                  <span className={`text-[10px] font-medium mt-2 transition-colors ${
                      isActive ? 'text-gray-900 font-bold' : 'text-gray-400'
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
             <div className="bg-amber-50 p-4 border-b border-amber-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                   <Sparkles size={18} className="text-amber-600" />
                   <h3 className="font-bold text-amber-900">AI Application Concierge</h3>
                </div>
                <button onClick={() => setShowNudgeModal(false)} className="text-amber-700 hover:bg-amber-100 p-1 rounded-full"><X size={18} /></button>
             </div>
             
             <div className="p-6">
                <h4 className="text-gray-900 font-bold mb-2">Review Follow-up Message</h4>
                <p className="text-xs text-gray-500 mb-4">
                   Your profile has been silent for {diffDays} days. We've drafted a professional nudge to bring you back to the top of the HR pile.
                </p>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                   <p className="text-xs text-gray-400 font-mono mb-2">Subject: Re: Application for {application.jobTitle}</p>
                   <div className="text-sm text-gray-700 italic leading-relaxed">
                      "Dear Hiring Team at {application.companyName},<br/><br/>
                      I hope this email finds you well. I wanted to briefly reiterate my strong interest in the <strong>{application.jobTitle}</strong> position. 
                      <br/><br/>
                      Given my alignment with {application.companyName}'s current initiatives, I am confident I can contribute to the team immediately. I remain very interested in discussing how my skills in React and System Design can add value.<br/><br/>
                      Best regards,<br/>
                      [My Name]"
                   </div>
                </div>

                <div className="flex gap-3">
                   <button 
                      onClick={() => setShowNudgeModal(false)}
                      className="flex-1 py-2.5 text-gray-600 font-bold hover:bg-gray-50 rounded-xl transition-colors"
                   >
                      Cancel
                   </button>
                   <button 
                      onClick={handleSendNudge}
                      className="flex-1 py-2.5 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 flex items-center justify-center gap-2 shadow-lg shadow-brand-200 transition-all"
                   >
                      <Send size={16} /> Send Email
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </>
  );
};
