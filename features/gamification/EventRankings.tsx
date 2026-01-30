
import React, { useState } from 'react';
import { LeaderboardWidget } from './LeaderboardWidget';
import { USERS, CURRENT_USER } from '../../data';
import { Calendar, Globe, Medal, TrendingUp, Info } from 'lucide-react';

export const EventRankings: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'month'>('all');

  return (
    <div className="space-y-6 relative pb-20">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-gray-900 to-indigo-900 rounded-2xl p-8 text-white shadow-xl">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold mb-2 flex items-center gap-3">
                    <Medal className="text-yellow-400" /> Talent Leaderboard
                </h1>
                <p className="text-indigo-200 text-sm max-w-lg">
                    Compete for the top spot. High-ranking promoters get exclusive access to VIP events and higher daily rates.
                </p>
            </div>
            
            <div className="flex bg-white/10 backdrop-blur rounded-lg p-1 border border-white/20">
                <button 
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${filter === 'all' ? 'bg-white text-gray-900 shadow-md' : 'text-white hover:bg-white/10'}`}
                >
                    All Time
                </button>
                <button 
                    onClick={() => setFilter('month')}
                    className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${filter === 'month' ? 'bg-white text-gray-900 shadow-md' : 'text-white hover:bg-white/10'}`}
                >
                    This Month
                </button>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Main Global Leaderboard */}
         <div className="lg:col-span-2 space-y-6">
             <LeaderboardWidget 
                users={USERS} 
                eventName={filter === 'all' ? "Global Hall of Fame" : "November Top Talent"} 
                limit={10} 
             />
         </div>

         {/* Side Stats & Info */}
         <div className="space-y-6">
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Info size={16} className="text-brand-600" /> How to Rank Up?
                </h3>
                <div className="space-y-4">
                    <div className="flex gap-3">
                        <div className="p-2 bg-green-50 rounded-lg h-fit text-green-600">
                            <TrendingUp size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">Attendance (50%)</h4>
                            <p className="text-xs text-gray-500">Never ghost a shift. Check-in on time using the QR scanner.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="p-2 bg-yellow-50 rounded-lg h-fit text-yellow-600">
                            <StarIcon />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">Company Rating (50%)</h4>
                            <p className="text-xs text-gray-500">Get 5-star feedback from employers after every event.</p>
                        </div>
                    </div>
                </div>
             </div>

             <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
                <Globe className="absolute -right-6 -bottom-6 text-white/10 w-32 h-32" />
                <h3 className="font-bold text-lg mb-1 relative z-10">Monthly Prize</h3>
                <p className="text-brand-100 text-xs mb-4 relative z-10">
                    Rank #1 this month wins a specialized workshop pass and a "Top Talent" profile badge.
                </p>
                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden relative z-10">
                    <div className="bg-white h-full w-[65%]"></div>
                </div>
                <p className="text-[10px] text-brand-100 mt-2 text-right relative z-10">12 Days Left</p>
             </div>
         </div>
      </div>

      {/* Sticky User Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 lg:pl-[280px]">
         <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <img src={CURRENT_USER.avatarUrl} className="w-10 h-10 rounded-full border-2 border-gray-200" />
                    <span className="absolute -top-1 -left-1 bg-gray-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        #{CURRENT_USER.gamification?.rank}
                    </span>
                </div>
                <div>
                    <p className="font-bold text-gray-900 text-sm">Your Position</p>
                    <p className="text-xs text-gray-500">Top 15% of all promoters</p>
                </div>
            </div>
            
            <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                    <p className="text-xs text-gray-400 uppercase font-bold">ProScore</p>
                    <p className="text-xl font-bold text-brand-600">{CURRENT_USER.gamification?.points}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase font-bold">Next Rank</p>
                    <p className="text-sm font-bold text-gray-900 flex items-center gap-1">
                        +50 pts <TrendingUp size={14} className="text-green-500" />
                    </p>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

// Helper Icon
const StarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);
