
import React, { useState } from 'react';
import { User, Squad } from '../../types';
import { USERS, CURRENT_USER } from '../../data';
import { Search, X, Plus, ShieldCheck, Users, Star, UserPlus, Info } from 'lucide-react';

interface SquadBuilderProps {
  onClose: () => void;
  onSave?: (squad: Squad) => void;
}

export const SquadBuilder: React.FC<SquadBuilderProps> = ({ onClose, onSave }) => {
  const [squadName, setSquadName] = useState(`${CURRENT_USER.name.split(' ')[0]}'s Squad`);
  const [members, setMembers] = useState<User[]>([CURRENT_USER]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Calculate Metrics Live
  const totalCompleted = members.reduce((acc, m) => acc + (m.shiftsCompleted || 0), 0);
  const totalBooked = members.reduce((acc, m) => acc + (m.shiftsBooked || 0), 0);
  const avgReliability = totalBooked > 0 ? Math.round((totalCompleted / totalBooked) * 100) : 100;
  const avgRating = (members.reduce((acc, m) => acc + (m.rating || 0), 0) / members.length).toFixed(1);

  const availableUsers = USERS.filter(u => 
    u.id !== CURRENT_USER.id && 
    !members.find(m => m.id === u.id) &&
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addMember = (user: User) => {
    if (members.length >= 5) return; // Max 5
    setMembers([...members, user]);
    setSearchQuery('');
  };

  const removeMember = (userId: string) => {
    if (userId === CURRENT_USER.id) return; // Cannot remove self
    setMembers(members.filter(m => m.id !== userId));
  };

  const handleCreate = () => {
    if (onSave) {
        onSave({
            id: `sq_new_${Date.now()}`,
            name: squadName,
            members,
            averageReliability: avgReliability,
            averageRating: Number(avgRating),
            totalShiftsCompleted: totalCompleted,
            vibe: ['New Squad']
        });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Users size={24} /> Squad Builder
                    </h2>
                    <p className="text-purple-100 text-sm mt-1">Form a team. Get hired faster.</p>
                </div>
                <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors"><X size={20}/></button>
            </div>

            {/* Live Stats */}
            <div className="flex gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur rounded-lg p-3 flex-1 border border-white/20">
                    <p className="text-xs text-purple-200 uppercase font-bold">Squad Reliability</p>
                    <p className="text-2xl font-bold flex items-center gap-2">
                        {avgReliability}% 
                        <ShieldCheck size={18} className={avgReliability >= 90 ? "text-green-300" : "text-yellow-300"} />
                    </p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-3 flex-1 border border-white/20">
                    <p className="text-xs text-purple-200 uppercase font-bold">Avg Rating</p>
                    <p className="text-2xl font-bold flex items-center gap-2">
                        {avgRating} <Star size={18} className="fill-yellow-400 text-yellow-400" />
                    </p>
                </div>
            </div>
        </div>

        <div className="p-6">
            {/* Squad Name */}
            <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-1">Squad Name</label>
                <input 
                    type="text" 
                    value={squadName}
                    onChange={(e) => setSquadName(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-bold text-gray-900"
                />
            </div>

            {/* Members List */}
            <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex justify-between">
                    Team Members 
                    <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{members.length}/5</span>
                </label>
                
                <div className="space-y-2">
                    {members.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img src={member.avatarUrl} className="w-10 h-10 rounded-full" />
                                    {member.id === CURRENT_USER.id && (
                                        <div className="absolute -top-1 -right-1 bg-purple-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">YOU</div>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">{member.name}</p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <Star size={10} className="fill-amber-400 text-amber-400"/> {member.rating || 'New'}
                                    </p>
                                </div>
                            </div>
                            {member.id !== CURRENT_USER.id && (
                                <button onClick={() => removeMember(member.id)} className="text-gray-400 hover:text-red-500 p-1">
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Member Search */}
            {members.length < 5 && (
                <div className="relative mb-6">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search friends by name..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    
                    {searchQuery && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                            {availableUsers.map(u => (
                                <button 
                                    key={u.id} 
                                    onClick={() => addMember(u)}
                                    className="w-full flex items-center gap-3 p-3 hover:bg-purple-50 transition-colors text-left"
                                >
                                    <img src={u.avatarUrl} className="w-8 h-8 rounded-full" />
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{u.name}</p>
                                        <p className="text-xs text-gray-500">{u.headline}</p>
                                    </div>
                                    <UserPlus size={16} className="ml-auto text-purple-600" />
                                </button>
                            ))}
                            {availableUsers.length === 0 && (
                                <div className="p-3 text-xs text-gray-500 text-center">No users found</div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="bg-blue-50 p-3 rounded-lg flex gap-3 mb-6">
                <Info className="text-blue-600 flex-shrink-0" size={18} />
                <p className="text-xs text-blue-700">
                    Applying as a squad increases your chances of getting hired for large events by 40%.
                </p>
            </div>

            <button 
                onClick={handleCreate}
                className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 shadow-lg shadow-purple-200 transition-all"
            >
                Create Squad
            </button>
        </div>
      </div>
    </div>
  );
};
