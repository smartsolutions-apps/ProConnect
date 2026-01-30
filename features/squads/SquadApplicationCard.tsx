
import React from 'react';
import { Squad } from '../../types';
import { Users, Star, ShieldCheck, Zap, MoreHorizontal, CheckCircle2 } from 'lucide-react';

interface SquadApplicationCardProps {
  squad: Squad;
  onHire: (squadId: string) => void;
}

export const SquadApplicationCard: React.FC<SquadApplicationCardProps> = ({ squad, onHire }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-lg hover:border-purple-200 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div>
            <div className="flex items-center gap-2 mb-1">
                <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide flex items-center gap-1">
                    <Users size={10} /> {squad.members.length} Members
                </span>
                <span className="text-xs text-gray-400 font-medium">{squad.totalShiftsCompleted} combined shifts</span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-700 transition-colors">
                {squad.name}
            </h3>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Member Stack */}
      <div className="flex items-center -space-x-2 mb-5 overflow-hidden py-1">
        {squad.members.map((member) => (
            <img 
                key={member.id}
                src={member.avatarUrl} 
                alt={member.name}
                title={`${member.name} (${member.rating})`}
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white cursor-help hover:scale-110 transition-transform hover:z-10 bg-gray-200"
            />
        ))}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
         <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <p className="text-xs text-gray-500 uppercase font-bold mb-1">Avg Rating</p>
            <div className="flex items-center gap-1.5">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                <span className="font-bold text-gray-900">{squad.averageRating}</span>
                <span className="text-xs text-gray-400">/5.0</span>
            </div>
         </div>
         <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <p className="text-xs text-gray-500 uppercase font-bold mb-1">Reliability</p>
            <div className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-green-600" />
                <span className="font-bold text-gray-900">{squad.averageReliability}%</span>
            </div>
         </div>
      </div>

      {/* Vibe Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {squad.vibe.map((tag, i) => (
            <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">
                #{tag}
            </span>
        ))}
      </div>

      <button 
        onClick={() => onHire(squad.id)}
        className="w-full py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-purple-600 transition-all flex items-center justify-center gap-2 shadow-sm"
      >
        <Zap size={16} className="fill-white" /> Hire Full Squad
      </button>
    </div>
  );
};
