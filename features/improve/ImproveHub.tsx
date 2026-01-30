
import React from 'react';
import { User } from '../../types';
import { SkillGapCard } from './SkillGapCard';
import { TrendingUp, Award, Zap, BrainCircuit } from 'lucide-react';

interface ImproveHubProps {
  user: User;
}

export const ImproveHub: React.FC<ImproveHubProps> = ({ user }) => {
  const insights = user.skillInsights || [];

  return (
    <div className="space-y-6 pb-24">
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-emerald-700/50 rounded-lg backdrop-blur-sm">
                        <TrendingUp size={24} className="text-emerald-100" />
                    </div>
                    <h1 className="text-2xl font-bold">Improve My Chances</h1>
                </div>
                <p className="text-emerald-100 max-w-lg leading-relaxed">
                    Don't just apply blindly. Use AI-driven feedback from your past applications to bridge your skill gaps and land the next role.
                </p>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
                <div className="bg-blue-50 p-3 rounded-full mb-2">
                    <BrainCircuit size={20} className="text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{insights.length}</span>
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Analyses Generated</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
                <div className="bg-amber-50 p-3 rounded-full mb-2">
                    <Award size={20} className="text-amber-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">2</span>
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Courses Recommended</span>
            </div>
        </div>

        {/* Insights List */}
        <div>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap size={18} className="text-brand-600" /> Recent Application Feedback
            </h3>
            
            {insights.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100 border-dashed">
                    <p className="text-gray-400 font-medium">No insights yet. Apply to jobs to generate feedback.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {insights.map(insight => (
                        <SkillGapCard key={insight.id} insight={insight} />
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};
