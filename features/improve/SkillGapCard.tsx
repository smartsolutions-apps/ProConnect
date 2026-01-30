
import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, BookOpen, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { SkillInsight } from '../../types';

interface SkillGapCardProps {
  insight: SkillInsight;
}

export const SkillGapCard: React.FC<SkillGapCardProps> = ({ insight }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine color based on match score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 50) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const scoreStyle = getScoreColor(insight.matchScore);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
      {/* Header Summary */}
      <div 
        className="p-5 cursor-pointer flex justify-between items-start"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Analysis for</span>
                <span className="text-xs font-bold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">{insight.companyName}</span>
            </div>
            <h3 className="font-bold text-gray-900 text-lg">{insight.jobTitle}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-1">{insight.advice}</p>
        </div>

        <div className="flex flex-col items-end gap-2 ml-4">
            <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-full border-2 ${scoreStyle}`}>
                <span className="text-xl font-bold leading-none">{insight.matchScore}</span>
                <span className="text-[8px] font-bold uppercase">% Match</span>
            </div>
            {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="px-5 pb-5 pt-0 animate-in slide-in-from-top-2">
            <div className="h-px bg-gray-100 mb-4"></div>
            
            {/* Missing Skills Section */}
            <div className="mb-4">
                <h4 className="text-xs font-bold text-red-600 uppercase flex items-center gap-1 mb-2">
                    <AlertTriangle size={14} /> Missing Critical Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                    {insight.missingSkills.map((skill, i) => (
                        <span key={i} className="text-sm bg-red-50 text-red-700 px-3 py-1.5 rounded-lg border border-red-100 font-medium">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* AI Advice Section */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
                <h4 className="text-xs font-bold text-blue-700 uppercase flex items-center gap-1 mb-2">
                    <TrendingUp size={14} /> Gemini Insight
                </h4>
                <p className="text-sm text-blue-900 leading-relaxed">
                    {insight.advice}
                </p>
            </div>

            {/* Action Plan */}
            <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1 mb-2">
                    <BookOpen size={14} /> Recommended Action
                </h4>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <span className="text-sm font-semibold text-gray-800">{insight.recommendedAction}</span>
                    <button className="text-xs font-bold text-brand-600 bg-white border border-brand-200 px-3 py-1.5 rounded-full hover:bg-brand-50 transition-colors">
                        View Course
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
