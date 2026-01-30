import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Loader2, X, FileText, Send, Bot } from 'lucide-react';
import { Job } from '../../types';

interface SmartApplyModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

export const SmartApplyModal: React.FC<SmartApplyModalProps> = ({ job, isOpen, onClose }) => {
  const [stage, setStage] = useState<'analyzing' | 'tailoring' | 'ready' | 'sent'>('analyzing');
  const [summary, setSummary] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStage('analyzing');
      // Generate a specific summary based on the job
      setSummary(`Passionate ${job.title} with experience in ${job.type} environments. I have a proven track record that aligns with ${job.companyName}'s goals, specifically in driving digital transformation and scalable engineering.`);
      
      const t1 = setTimeout(() => setStage('tailoring'), 1500);
      const t2 = setTimeout(() => setStage('ready'), 3500);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [isOpen, job]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-600 to-brand-700 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
                <Bot size={20} className="text-white" />
                <div>
                  <h3 className="font-bold text-sm">ProConnect Concierge</h3>
                  <p className="text-[10px] text-brand-100">AI-Powered Application Agent</p>
                </div>
            </div>
            <button onClick={onClose} className="hover:bg-white/10 p-1 rounded-full transition-colors"><X size={20}/></button>
        </div>

        <div className="p-6">
            {stage !== 'sent' ? (
                <>
                   <div className="mb-6 border-b border-gray-100 pb-4">
                        <h2 className="text-lg font-bold text-gray-900">Applying to {job.companyName}</h2>
                        <p className="text-sm text-gray-500">{job.title} • {job.location}</p>
                   </div>

                   {/* AI Interaction Area */}
                   <div className="bg-gray-50 rounded-xl p-4 mb-6 min-h-[140px]">
                      {stage === 'analyzing' && (
                        <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2">
                           <div className="p-2 bg-white rounded-full shadow-sm">
                              <Loader2 size={18} className="text-brand-600 animate-spin" />
                           </div>
                           <div>
                              <p className="text-sm font-semibold text-gray-900">Analyzing Job Requirements...</p>
                              <p className="text-xs text-gray-500 mt-1">Scanning {job.companyName} requirements against your profile.</p>
                           </div>
                        </div>
                      )}

                      {stage === 'tailoring' && (
                        <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2">
                           <div className="p-2 bg-white rounded-full shadow-sm">
                              <Sparkles size={18} className="text-purple-500 animate-pulse" />
                           </div>
                           <div>
                              <p className="text-sm font-semibold text-gray-900">Tailoring your CV...</p>
                              <p className="text-xs text-gray-500 mt-1">I am tailoring your CV for this specific role at {job.companyName}...</p>
                           </div>
                        </div>
                      )}

                      {stage === 'ready' && (
                        <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2">
                           <div className="p-2 bg-white rounded-full shadow-sm">
                              <CheckCircle2 size={18} className="text-green-500" />
                           </div>
                           <div>
                              <p className="text-sm font-semibold text-gray-900">Optimization Complete</p>
                              <p className="text-xs text-gray-500 mt-1">Your profile is now a 92% match for this listing.</p>
                           </div>
                        </div>
                      )}
                   </div>

                   {stage === 'ready' && (
                       <div className="mb-6 animate-in slide-in-from-bottom-4">
                           <div className="flex justify-between items-center mb-2">
                              <label className="text-xs font-bold uppercase text-gray-500">AI-Tailored Summary</label>
                              <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full font-medium">Editable</span>
                           </div>
                           <textarea 
                              value={summary}
                              onChange={(e) => setSummary(e.target.value)}
                              rows={4}
                              className="w-full p-3 text-sm border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-gray-700 leading-relaxed shadow-sm resize-none"
                           />
                       </div>
                   )}

                   <button 
                    disabled={stage !== 'ready'}
                    onClick={() => setStage('sent')}
                    className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${stage === 'ready' ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-200 transform hover:-translate-y-0.5' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                   >
                       {stage === 'ready' ? <><Send size={18} /> Submit Optimized Application</> : <><Loader2 size={18} className="animate-spin"/> Processing...</>}
                   </button>
                </>
            ) : (
                <div className="text-center py-8 animate-in zoom-in-95">
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Sent!</h3>
                    <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                      Your tailored profile has been delivered to <strong>{job.companyName}</strong>.
                    </p>
                    <button onClick={onClose} className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                        Return to Job Board
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};