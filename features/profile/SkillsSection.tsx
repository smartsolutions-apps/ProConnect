
import React, { useState } from 'react';
import { User } from '../../types';
import { ShieldCheck, Plus, Zap, Award } from 'lucide-react';
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Zap className="text-brand-600" size={20} />
          Skills & Endorsements
        </h3>
        {!isRecruiterView && (
          <button className="text-sm text-brand-600 font-bold hover:underline flex items-center gap-1">
            <Plus size={16} /> Add Skill
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {user.skills.map((skill) => {
          const isVerified = verifiedSkills.includes(skill);

          return (
            <div 
              key={skill}
              className={`group flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                isVerified 
                  ? 'bg-yellow-50 border-yellow-200 text-yellow-900 shadow-sm' 
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="font-bold text-sm">{skill}</span>
              
              {isVerified ? (
                <div className="flex items-center gap-1" title="Gold Verified Badge">
                  <div className="w-5 h-5 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-sm">
                    <ShieldCheck size={12} className="text-yellow-900" />
                  </div>
                </div>
              ) : (
                !isRecruiterView && (
                  <button 
                    onClick={() => setActiveQuizSkill(skill)}
                    className="text-[10px] font-bold bg-gray-900 text-white px-2 py-0.5 rounded ml-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 hover:bg-brand-600"
                  >
                    <Award size={10} />
                    Verify
                  </button>
                )
              )}
            </div>
          );
        })}
      </div>

      {isRecruiterView && verifiedSkills.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-yellow-700 font-medium">
          <ShieldCheck size={14} className="text-yellow-500" />
          {verifiedSkills.length} skills verified by ProConnect technical assessment.
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
