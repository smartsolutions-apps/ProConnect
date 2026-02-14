
import React, { useState } from 'react';
import { Building2, Mic, ToggleLeft, ToggleRight, Eye, EyeOff, Layout, Code2, Calendar, Users } from 'lucide-react';
import { User } from '../../types';
import { SocialHighlights } from './SocialHighlights';
import { WorkStyleSection } from './WorkStyleSection';
import { SalarySection } from './SalarySection';
import { ChallengesSection } from './ChallengesSection';
import { SoftSkillBadges } from './SoftSkillBadges';
import { BookInterviewModal } from './BookInterviewModal';
import { TrustBadge } from '../../components/common/TrustBadge';
import { WalletDashboard } from '../wallet/WalletDashboard';
import { SquadBuilder } from '../squads/SquadBuilder'; 
import { SkillsSection } from './SkillsSection';
import { useDemo } from '../../context/DemoContext';

interface ProfileViewProps {
  user: User;
}

type ProfileTab = 'OVERVIEW' | 'CHALLENGES';

export const ProfileView: React.FC<ProfileViewProps> = ({ user }) => {
  const { isDemoMode, demoValues } = useDemo();
  const [isRecruiterView, setIsRecruiterView] = useState(false);
  const [activeTab, setActiveTab] = useState<ProfileTab>('OVERVIEW');
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isSquadBuilderOpen, setIsSquadBuilderOpen] = useState(false);

  // --- DEMO OVERRIDE: Reliability ---
  const displayShiftsBooked = isDemoMode ? 100 : user.shiftsBooked;
  const displayShiftsCompleted = isDemoMode ? demoValues.reliabilityScore : user.shiftsCompleted;

  return (
    <div className="space-y-6">
        <div className={`rounded-xl p-4 flex justify-between items-center shadow-sm transition-colors ${isRecruiterView ? 'bg-gray-900 text-white' : 'bg-white border border-gray-100 text-gray-900'}`}>
            <div className="flex items-center gap-3">
               <div className={`p-2 rounded-full ${isRecruiterView ? 'bg-white/10' : 'bg-gray-100'}`}>
                  {isRecruiterView ? <Eye size={20} /> : <EyeOff size={20} />}
               </div>
               <div>
                  <h3 className="font-bold text-sm">Simulation Mode</h3>
                  <p className={`text-xs ${isRecruiterView ? 'text-gray-400' : 'text-gray-500'}`}>
                    {isRecruiterView ? 'Viewing as: Hiring Manager' : 'Viewing as: Candidate (You)'}
                  </p>
               </div>
            </div>
            
            <button 
                onClick={() => setIsRecruiterView(!isRecruiterView)}
                className="flex items-center gap-2 cursor-pointer group"
            >
                <span className={`text-xs font-bold ${isRecruiterView ? 'text-indigo-400' : 'text-gray-400 group-hover:text-gray-600'}`}>
                    {isRecruiterView ? 'Recruiter View ON' : 'Switch to Recruiter View'}
                </span>
                {isRecruiterView ? 
                    <ToggleRight size={32} className="text-indigo-400 fill-indigo-400/20"/> : 
                    <ToggleLeft size={32} className="text-gray-300 group-hover:text-gray-400"/>
                }
            </button>
        </div>

        {!isRecruiterView && user.wallet && (
            <WalletDashboard wallet={user.wallet} />
        )}

        <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm border border-gray-100 dark:border-[#333333] overflow-hidden transition-colors">
            <div className="h-32 bg-gradient-to-r from-indigo-600 to-indigo-800"></div>
            <div className="px-6 pb-2">
                <div className="relative flex justify-between items-end -mt-12 mb-4">
                    <img 
                        src={user.avatarUrl} 
                        className="w-32 h-32 rounded-full border-4 border-white dark:border-[#1e1e1e] bg-white"
                        alt="Profile"
                    />
                    {isRecruiterView ? (
                        <button 
                            onClick={() => setIsBookModalOpen(true)}
                            className="mb-4 px-6 py-2 bg-indigo-600 text-white rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2"
                        >
                            <Calendar size={18} /> Book Interview
                        </button>
                    ) : (
                        <div className="flex gap-2 mb-4">
                            <button 
                                onClick={() => setIsSquadBuilderOpen(true)}
                                className="px-4 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 rounded-full font-bold text-sm hover:bg-purple-100 flex items-center gap-2"
                            >
                                <Users size={16} /> Create Squad
                            </button>
                        </div>
                    )}
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                    {displayShiftsBooked !== undefined && (
                        <TrustBadge completed={displayShiftsCompleted || 0} booked={displayShiftsBooked} size="sm" />
                    )}
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">{user.headline}</p>
                {user.softSkills && <SoftSkillBadges badges={user.softSkills} />}

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6 mt-4">
                    <span>{user.location}</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer">Contact info</span>
                </div>

                <div className="flex gap-6 border-b border-gray-100 dark:border-[#333333] mt-6">
                    <button 
                        onClick={() => setActiveTab('OVERVIEW')}
                        className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'OVERVIEW' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        <Layout size={16} /> Overview
                    </button>
                    <button 
                        onClick={() => setActiveTab('CHALLENGES')}
                        className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'CHALLENGES' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        <Code2 size={16} /> Challenges <span className="bg-gray-100 dark:bg-[#333] text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded-full text-[10px]">{user.challenges?.length || 0}</span>
                    </button>
                </div>
            </div>
        </div>

        {activeTab === 'OVERVIEW' ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                 <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm border border-gray-100 dark:border-[#333333] p-6 transition-colors">
                    <div className="bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-1">Open to work</h3>
                        <p className="text-sm text-indigo-700 dark:text-indigo-400">Software Engineer, Lead Promoter</p>
                    </div>

                    <div className="">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">About</h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {user.name} is a top-performing professional in the Egyptian market. Specialized in high-velocity operations and technical execution.
                        </p>
                    </div>
                 </div>

                <SkillsSection user={user} isRecruiterView={isRecruiterView} />
                <SalarySection user={user} isRecruiterView={isRecruiterView} />
                <WorkStyleSection initialData={user.workStyle} isRecruiterMode={isRecruiterView} />
                <SocialHighlights />

                <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm border border-gray-100 dark:border-[#333333] p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Education</h3>
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-[#2d2d2d] rounded flex items-center justify-center text-gray-400">
                           <Building2 size={24} />
                        </div>
                        <div>
                           <h4 className="font-semibold text-gray-900 dark:text-white">{user.university}</h4>
                           <p className="text-sm text-gray-600 dark:text-gray-400">Bachelor's Degree</p>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="animate-in fade-in slide-in-from-right-2">
                <ChallengesSection challenges={user.challenges || []} isRecruiterView={isRecruiterView} />
            </div>
        )}

        <BookInterviewModal 
            isOpen={isBookModalOpen}
            onClose={() => setIsBookModalOpen(false)}
            candidate={user}
        />
        {isSquadBuilderOpen && (
            <SquadBuilder onClose={() => setIsSquadBuilderOpen(false)} />
        )}
    </div>
  );
};
