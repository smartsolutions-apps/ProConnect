
import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Clock, BrainCircuit, AlertCircle, Award } from 'lucide-react';

interface SkillQuizModalProps {
  skill: string;
  onClose: () => void;
  onComplete: () => void;
}

export const SkillQuizModal: React.FC<SkillQuizModalProps> = ({ skill, onClose, onComplete }) => {
  const [step, setStep] = useState<'INTRO' | 'QUESTIONS' | 'ANALYZING' | 'SUCCESS'>('INTRO');
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    if (step === 'QUESTIONS') {
      const interval = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 1));
        setProgress(prev => Math.min(100, prev + 2)); // Simulate answering
      }, 50); // Fast simulation for demo

      if (progress >= 100) {
        setStep('ANALYZING');
      }
      return () => clearInterval(interval);
    }
  }, [step, progress]);

  useEffect(() => {
    if (step === 'ANALYZING') {
      const timeout = setTimeout(() => {
        setStep('SUCCESS');
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [step]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <BrainCircuit size={24} className="text-yellow-400" />
              {skill} Assessment
            </h2>
            <p className="text-gray-400 text-sm mt-1">Verify your expertise to stand out.</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors"><X size={20}/></button>
        </div>

        <div className="p-8">
          {step === 'INTRO' && (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto flex items-center justify-center border-4 border-gray-50">
                <div className="text-4xl">🎓</div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Ready to verify {skill}?</h3>
                <p className="text-gray-500 mt-2">
                  15 multiple-choice questions. 5 minutes.
                  Pass to earn the <strong>Gold Verified Badge</strong>.
                </p>
              </div>
              <div className="flex gap-4 justify-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <span className="flex items-center gap-1"><Clock size={16} /> 5 mins</span>
                <span className="flex items-center gap-1"><CheckCircle2 size={16} /> 70% to pass</span>
              </div>
              <button 
                onClick={() => setStep('QUESTIONS')}
                className="w-full py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-200"
              >
                Start Assessment
              </button>
            </div>
          )}

          {step === 'QUESTIONS' && (
            <div className="space-y-6 text-center">
              <h3 className="font-bold text-gray-900">Assessing your knowledge...</h3>
              <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-600 transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 font-mono">
                Running unit tests on your answers...
              </p>
            </div>
          )}

          {step === 'ANALYZING' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="font-bold text-gray-900">Analyzing Results</h3>
              <p className="text-gray-500 text-sm">Comparing with industry standards...</p>
            </div>
          )}

          {step === 'SUCCESS' && (
            <div className="text-center animate-in zoom-in">
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center mx-auto border-4 border-yellow-100">
                  <Award size={48} className="text-yellow-600" />
                </div>
                <div className="absolute bottom-0 right-0 bg-green-500 text-white p-1.5 rounded-full border-4 border-white">
                  <CheckCircle2 size={20} />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Verification Passed!</h3>
              <p className="text-gray-600 mb-6">
                You scored in the <strong>Top 5%</strong> of applicants.
                The Gold Badge has been added to your profile.
              </p>

              <button 
                onClick={onComplete}
                className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all"
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
