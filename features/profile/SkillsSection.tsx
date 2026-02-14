
import React, { useState } from 'react';
import { User } from '../../types';
import { ShieldCheck, Plus, Zap, Award, BookOpen, ChevronRight } from 'lucide-react';
import { SkillQuizModal } from './SkillQuizModal';

interface SkillsSectionProps {
  user: User;
  isRecruiterView: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ user, isRecruiterView }) => {
  const [verifiedSkills, setVerifiedSkills] = useState<string[]>(user.verifiedSkills || []);
  const [activeQuizSkill, setActiveQuizSkill] = useState<string | null>(null);

  const handleQuizComplete = () => {
    if (activeQuizSkill) {
      setVerifiedSkills(prev => [...prev, activeQuizSkill]);
      setActiveQuizSkill(null);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-sm border border-slate-100 dark:border-[#333333] p-6 lg:p-8 transition-colors">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
              <Zap className="text-indigo-600 dark:text-indigo-400" size={24} />
            </div>
            Skills Verification
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Get your skills independently verified by our AI assessment engine.
          </p>
        </div>
        {!isRecruiterView && (
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-full transition-colors">
            <Plus size={18} /> Add Skill
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {user.skills.map((skill) => {
          const isVerified = verifiedSkills.includes(skill);

          return (
            <div 
              key={skill}
              className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                isVerified 
                  ? 'bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900/50 shadow-sm' 
                  : 'bg-slate-50 dark:bg-[#2d2d2d] border-slate-100 dark:border-[#333333] hover:border-indigo-200 dark:hover:border-indigo-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isVerified ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-white dark:bg-[#1e1e1e] text-slate-400 dark:text-slate-500'}`}>
                  {isVerified ? <ShieldCheck size={20} /> : <BookOpen size={20} />}
                </div>
                <div>
                  <span className="font-black text-slate-900 dark:text-white text-sm">{skill}</span>
                  {isVerified && (
                    <p className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest">Gold Verified</p>
                  )}
                </div>
              </div>
              
              {isVerified ? (
                <div className="flex items-center gap-1 bg-white dark:bg-[#1e1e1e] px-2 py-1 rounded-lg border border-amber-200 dark:border-amber-900/50 shadow-sm">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                   <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Trusted</span>
                </div>
              ) : (
                !isRecruiterView && (
                  <button 
                    onClick={() => setActiveQuizSkill(skill)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-[#1e1e1e] hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white text-indigo-600 dark:text-indigo-400 text-xs font-black rounded-xl border border-indigo-100 dark:border-indigo-900/50 transition-all active:scale-95 shadow-sm group-hover:border-indigo-500"
                  >
                    Take 5-min Quiz
                    <ChevronRight size={14} />
                  </button>
                )
              )}
            </div>
          );
        })}
      </div>

      {isRecruiterView && verifiedSkills.length > 0 && (
        <div className="mt-8 p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-3">
          <div className="p-2 bg-white dark:bg-[#1e1e1e] rounded-full text-emerald-600 dark:text-emerald-400 shadow-sm">
            <Award size={20} />
          </div>
          <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
            {verifiedSkills.length} Core skills verified. This candidate ranks in the top 5% of our pool.
          </p>
        </div>
      )}

      {/* QUIZ MODAL */}
      {activeQuizSkill && (
        <SkillQuizModal 
          skill={activeQuizSkill} 
          onClose={() => setActiveQuizSkill(null)}
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
};
