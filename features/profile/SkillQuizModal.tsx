
import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Clock, BrainCircuit, AlertCircle, Award, Zap, Loader2 } from 'lucide-react';

interface SkillQuizModalProps {
  skill: string;
  onClose: () => void;
  onComplete: () => void;
}

export const SkillQuizModal: React.FC<SkillQuizModalProps> = ({ skill, onClose, onComplete }) => {
  const [step, setStep] = useState<'INTRO' | 'QUESTIONS' | 'ANALYZING' | 'SUCCESS'>('INTRO');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (step === 'QUESTIONS') {
      const interval = setInterval(() => {
        setProgress(prev => {
            const next = prev + 4;
            if (next >= 100) {
                clearInterval(interval);
                setTimeout(() => setStep('ANALYZING'), 500);
                return 100;
            }
            return next;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [step]);

  useEffect(() => {
    if (step === 'ANALYZING') {
      const timeout = setTimeout(() => {
        setStep('SUCCESS');
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [step]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#1e1e1e] rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-200 dark:border-[#333333]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-[#333333] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-xl text-white">
              <BrainCircuit size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">{skill} Assessment</h2>
              <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Technical Track</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-[#2d2d2d] rounded-full text-slate-400 transition-colors"><X size={20}/></button>
        </div>

        <div className="p-8">
          {step === 'INTRO' && (
            <div className="text-center space-y-8">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-slate-50 dark:bg-[#2d2d2d] rounded-3xl mx-auto flex items-center justify-center border-2 border-slate-100 dark:border-[#333333] rotate-3 group-hover:rotate-0 transition-transform">
                  <Zap size={48} className="text-amber-500 fill-amber-500/20" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white dark:bg-[#1e1e1e] p-2 rounded-full shadow-lg border border-slate-100 dark:border-[#333333]">
                    <Clock size={20} className="text-indigo-600" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Prove your expertise</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xs mx-auto">
                  Complete 15 technical questions to earn your <strong>Gold Verified Status</strong> for recruiters.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-[#2d2d2d] p-3 rounded-2xl border border-slate-100 dark:border-[#333333]">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Time Limit</p>
                    <p className="font-black text-slate-900 dark:text-white italic">5 Minutes</p>
                </div>
                <div className="bg-slate-50 dark:bg-[#2d2d2d] p-3 rounded-2xl border border-slate-100 dark:border-[#333333]">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Pass Mark</p>
                    <p className="font-black text-slate-900 dark:text-white italic">Top 30%</p>
                </div>
              </div>

              <button 
                onClick={() => setStep('QUESTIONS')}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-200 dark:shadow-none active:scale-[0.98]"
              >
                Begin Assessment
              </button>
            </div>
          )}

          {step === 'QUESTIONS' && (
            <div className="space-y-8 text-center py-4">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Simulating Test...</h3>
              <div className="w-full bg-slate-100 dark:bg-[#2d2d2d] h-3 rounded-full overflow-hidden border border-slate-200 dark:border-[#333333]">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-300 ease-linear shadow-[0_0_10px_rgba(79,70,229,0.5)]"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-1 gap-2 text-left">
                {[1,2,3].map(i => (
                    <div key={i} className={`h-12 rounded-xl border border-slate-100 dark:border-[#333333] animate-pulse bg-slate-50 dark:bg-[#2d2d2d] ${progress > (i*25) ? 'opacity-100' : 'opacity-40'}`}></div>
                ))}
              </div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest animate-pulse">
                Evaluating reasoning patterns...
              </p>
            </div>
          )}

          {step === 'ANALYZING' && (
            <div className="text-center py-12">
              <Loader2 size={64} className="animate-spin text-indigo-600 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Crunching Results</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Gemini is verifying your technical answers against the standard.</p>
            </div>
          )}

          {step === 'SUCCESS' && (
            <div className="text-center animate-in zoom-in duration-500">
              <div className="relative inline-block mb-8">
                <div className="w-32 h-32 bg-amber-100 dark:bg-amber-900/20 rounded-[40px] flex items-center justify-center mx-auto border-4 border-amber-200 dark:border-amber-900/50 shadow-xl shadow-amber-100 dark:shadow-none">
                  <Award size={64} className="text-amber-500 fill-amber-500/20" />
                </div>
                <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-2xl shadow-lg border-4 border-white dark:border-[#1e1e1e] animate-bounce">
                  <CheckCircle2 size={24} />
                </div>
              </div>
              
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">You're Verified!</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xs mx-auto text-sm leading-relaxed">
                Exceptional performance! You scored <strong>94%</strong>. The Gold Badge is now live on your profile.
              </p>

              <div className="mt-8 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 flex items-center justify-center gap-2">
                 <Zap size={16} className="text-indigo-600 dark:text-indigo-400" />
                 <span className="text-xs font-black text-indigo-900 dark:text-indigo-300 uppercase tracking-widest">+50 Reliability Points Earned</span>
              </div>

              <button 
                onClick={onComplete}
                className="mt-10 w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl transition-all shadow-xl active:scale-[0.98]"
              >
                Claim Badge & Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
