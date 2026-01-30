
import React from 'react';
import { SoftSkillBadge, SoftSkillType } from '../../types';
import { Lightbulb, Clock, Smile, Users, Award, ShieldCheck } from 'lucide-react';

interface SoftSkillBadgesProps {
  badges: SoftSkillBadge[];
}

const BADGE_CONFIG: Record<SoftSkillType, { label: string; icon: any; colorClass: string }> = {
  PROBLEM_SOLVER: {
    label: "Problem Solver",
    icon: Lightbulb,
    colorClass: "from-amber-200 to-amber-500 text-amber-900 border-amber-300" // Gold
  },
  PUNCTUAL: {
    label: "Punctual",
    icon: Clock,
    colorClass: "from-slate-200 to-slate-400 text-slate-800 border-slate-300" // Silver/Steel
  },
  MORALE_BOOSTER: {
    label: "Morale Booster",
    icon: Smile,
    colorClass: "from-orange-200 to-orange-400 text-orange-900 border-orange-300" // Bronze
  },
  LEADERSHIP: {
    label: "Leadership",
    icon: Users,
    colorClass: "from-blue-200 to-blue-500 text-blue-900 border-blue-300"
  },
  MENTOR: {
    label: "Top Mentor",
    icon: Award,
    colorClass: "from-purple-200 to-purple-500 text-purple-900 border-purple-300"
  }
};

export const SoftSkillBadges: React.FC<SoftSkillBadgesProps> = ({ badges }) => {
  // Only show badges with 3+ endorsements
  const verifiedBadges = badges.filter(b => b.endorsements >= 3);

  if (verifiedBadges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3 mt-4 animate-in fade-in slide-in-from-bottom-2">
      {verifiedBadges.map((badge) => {
        const config = BADGE_CONFIG[badge.type];
        const Icon = config.icon;

        return (
          <div 
            key={badge.id}
            className={`group relative flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border bg-gradient-to-br shadow-sm cursor-help hover:scale-105 transition-transform ${config.colorClass}`}
          >
            <div className="p-1 bg-white/40 rounded-full backdrop-blur-sm">
                <Icon size={14} className="fill-current/20" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wide">{config.label}</span>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
               <div className="flex items-center gap-2 mb-1 text-green-400 font-bold">
                  <ShieldCheck size={12} /> Verified
               </div>
               Endorsed by {badge.endorsements} verified ProConnect peers who have worked with {config.label.split(' ')[0]}.
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
