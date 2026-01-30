
import React, { useState } from 'react';
import { ChevronRight, Lock, Unlock, TrendingUp, Info } from 'lucide-react';
import { User, CareerLevel } from '../../types';
import { CAREER_LEVELS } from '../../data/career';

interface CareerProgressCardProps {
  user: User;
}

export const CareerProgressCard: React.FC<CareerProgressCardProps> = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Fallback if level undefined
  const currentLevelId = user.careerLevel || 'STARTER';
  const currentConfig = CAREER_LEVELS[currentLevelId];
  const nextLevelId = currentConfig.nextLevel;
  const nextConfig = nextLevelId ? CAREER_LEVELS[nextLevelId] : null;

  // Calculate Progress
  const completed = user.shiftsCompleted || 0;
  const booked = user.shiftsBooked || 0;
  const rating = user.rating || 0;
  const reliability = booked > 0 ? (completed / booked) * 100 : 100;

  // Progress Percentage (Based on Shift Count primarily for the bar)
  let progressPercent = 100;
  let shiftsNeeded = 0;

  if (nextConfig) {
    const requiredShifts = nextConfig.requirements.shifts;
    const prevRequiredShifts = currentConfig.requirements.shifts;
    
    // Calculate progress within the current tier bracket
    const totalGap = requiredShifts - prevRequiredShifts;
    const currentProgress = completed - prevRequiredShifts;
    
    progressPercent = Math.min(100, Math.max(0, (currentProgress / totalGap) * 100));
    shiftsNeeded = Math.max(0, requiredShifts - completed);
  }

  const Icon = currentConfig.icon;

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl shadow-lg text-white overflow-hidden mb-6 relative border border-purple-700">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="p-5 relative z-10">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
              <Icon size={24} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-purple-200 font-bold uppercase tracking-wider">Career Path</p>
              <h3 className="font-bold text-lg leading-none flex items-center gap-2">
                {currentConfig.label} 
                <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full font-mono text-white/90">Lvl {Object.keys(CAREER_LEVELS).indexOf(currentLevelId) + 1}</span>
              </h3>
            </div>
          </div>
          
          <div className="text-right">
             {nextConfig ? (
               <div>
                 <p className="text-xs text-purple-200">Next Promotion</p>
                 <p className="font-bold text-sm text-white flex items-center justify-end gap-1">
                   {nextConfig.label} <TrendingUp size={14} className="text-green-400"/>
                 </p>
               </div>
             ) : (
               <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded border border-yellow-500/50">Max Level</span>
             )}
          </div>
        </div>

        {/* Progress Bar */}
        {nextConfig && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-purple-200 mb-1">
              <span>{Math.round(progressPercent)}% to promotion</span>
              <span>{shiftsNeeded} shifts left</span>
            </div>
            <div className="w-full bg-black/30 h-2.5 rounded-full overflow-hidden border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Unlocked Benefits Summary (Collapsed) */}
        {!isExpanded && (
           <div className="flex items-center justify-between text-xs bg-black/20 rounded-lg p-2 px-3 border border-white/10 cursor-pointer hover:bg-black/30 transition-colors" onClick={() => setIsExpanded(true)}>
              <span className="flex items-center gap-1.5 text-purple-100">
                 <Unlock size={12} className="text-green-400" />
                 Unlocks: {nextConfig?.perks[0] || 'Max Rewards'}
              </span>
              <ChevronRight size={14} className="text-purple-300" />
           </div>
        )}

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-white/10 animate-in slide-in-from-top-2">
             <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                   <p className="text-[10px] text-purple-300 uppercase font-bold">Requirements</p>
                   <ul className="text-xs space-y-1 text-white/90">
                      <li className="flex justify-between">
                        <span>Shifts:</span>
                        <span className={completed >= (nextConfig?.requirements.shifts || 0) ? "text-green-400" : "text-white"}>
                           {completed}/{nextConfig?.requirements.shifts}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Rating:</span>
                        <span className={rating >= (nextConfig?.requirements.rating || 0) ? "text-green-400" : "text-white"}>
                           {rating}/{nextConfig?.requirements.rating}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Reliability:</span>
                        <span className={reliability >= (nextConfig?.requirements.reliability || 0) ? "text-green-400" : "text-white"}>
                           {Math.round(reliability)}%/{nextConfig?.requirements.reliability}%
                        </span>
                      </li>
                   </ul>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] text-purple-300 uppercase font-bold">Benefits</p>
                   <ul className="text-xs space-y-1 text-white/90">
                      {nextConfig?.perks.map((perk, i) => (
                         <li key={i} className="flex items-start gap-1.5">
                            <Lock size={10} className="mt-0.5 text-purple-400" />
                            {perk}
                         </li>
                      ))}
                   </ul>
                </div>
             </div>
             
             <button 
                onClick={() => setIsExpanded(false)}
                className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold text-white transition-colors"
             >
                Collapse Details
             </button>
          </div>
        )}
      </div>
    </div>
  );
};
