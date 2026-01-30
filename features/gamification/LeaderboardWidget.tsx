
import React, { useMemo } from 'react';
import { User } from '../../types';
import { Crown, Star, TrendingUp, Trophy } from 'lucide-react';

interface LeaderboardWidgetProps {
  users: User[];
  eventName?: string;
  limit?: number;
}

interface RankedUser extends User {
  proScore: number;
}

export const LeaderboardWidget: React.FC<LeaderboardWidgetProps> = ({ users, eventName = "Global Rankings", limit = 10 }) => {
  
  // Calculate Scores
  const rankedUsers: RankedUser[] = useMemo(() => {
    return users
      .map(user => {
        const attendanceRate = user.shiftsBooked && user.shiftsBooked > 0 
            ? user.shiftsCompleted! / user.shiftsBooked 
            : 0;
        
        // Formula: (Attendance Rate * 50) + (Company Rating * 10) = Max 100
        const ratingScore = (user.rating || 0) * 10;
        const attendanceScore = attendanceRate * 50;
        const proScore = Math.round(attendanceScore + ratingScore);
        
        return { ...user, proScore };
      })
      .sort((a, b) => b.proScore - a.proScore)
      .slice(0, limit);
  }, [users, limit]);

  const topThree = rankedUsers.slice(0, 3);
  const theRest = rankedUsers.slice(3);

  // Podium Helpers
  const getPodiumClass = (index: number) => {
    switch (index) {
        case 0: return 'h-32 w-24 bg-gradient-to-t from-yellow-100 to-yellow-50 border-t-4 border-yellow-400 order-2 scale-110 z-10 rounded-t-lg shadow-lg'; // Gold
        case 1: return 'h-24 w-20 bg-gradient-to-t from-slate-100 to-slate-50 border-t-4 border-slate-400 order-1 rounded-tl-lg rounded-bl-lg opacity-90'; // Silver
        case 2: return 'h-20 w-20 bg-gradient-to-t from-orange-100 to-orange-50 border-t-4 border-orange-400 order-3 rounded-tr-lg rounded-br-lg opacity-80'; // Bronze
        default: return '';
    }
  };

  const getBorderColor = (index: number) => {
      switch(index) {
          case 0: return 'border-yellow-400 ring-yellow-200';
          case 1: return 'border-slate-400 ring-slate-200';
          case 2: return 'border-orange-400 ring-orange-200';
          default: return 'border-transparent';
      }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div>
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Trophy size={18} className="text-brand-600" />
                    {eventName}
                </h3>
                <p className="text-xs text-gray-500">Top Performers based on ProScore™</p>
            </div>
            <button className="text-xs font-bold text-brand-600 hover:underline">View All</button>
        </div>

        <div className="p-6">
            {/* THE PODIUM */}
            <div className="flex justify-center items-end mb-8 gap-1">
                {/* We map Top 3 but rely on 'order' class to position 2-1-3 visually */}
                {topThree.map((user, idx) => (
                    <div key={user.id} className={`flex flex-col items-center justify-end relative ${getPodiumClass(idx)}`}>
                        {/* Avatar */}
                        <div className={`absolute -top-10 transition-transform hover:scale-110`}>
                            <div className={`relative`}>
                                <img 
                                    src={user.avatarUrl} 
                                    className={`w-14 h-14 rounded-full border-2 ring-2 bg-white object-cover ${getBorderColor(idx)}`}
                                />
                                {idx === 0 && (
                                    <div className="absolute -top-4 -right-2 bg-yellow-400 text-white p-1 rounded-full shadow-sm animate-bounce">
                                        <Crown size={12} fill="white" />
                                    </div>
                                )}
                                <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                                    <span className="bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                                        {user.proScore} pts
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Name in Podium Base */}
                        <div className="mb-2 text-center px-1">
                            <p className="text-xs font-bold text-gray-800 line-clamp-1">{user.name.split(' ')[0]}</p>
                            <p className={`text-[10px] font-bold ${idx === 0 ? 'text-yellow-600' : idx === 1 ? 'text-slate-600' : 'text-orange-600'}`}>
                                #{idx + 1}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* THE LIST */}
            <div className="space-y-3">
                {theRest.map((user, idx) => (
                    <div key={user.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-bold text-gray-400 w-4">#{idx + 4}</span>
                            <div className="relative">
                                <img src={user.avatarUrl} className="w-8 h-8 rounded-full border border-gray-200" />
                                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">{user.name}</p>
                                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                                    <Star size={8} className="fill-amber-400 text-amber-400" />
                                    {user.rating} Rating
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-sm font-bold text-brand-600">{user.proScore}</span>
                            <span className="text-[10px] text-gray-400 block uppercase">ProScore</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};
