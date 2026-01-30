
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
  // If Demo Mode, show Elite stats (e.g. 98/100)
  const displayShiftsBooked = isDemoMode ? 100 : user.shiftsBooked;
  const displayShiftsCompleted = isDemoMode ? demoValues.reliabilityScore : user.shiftsCompleted;

  return (
    <div className="space-y-6">
        {/* Recruiter Simulation Toggle Bar */}
        <div className={`rounded-xl p-4 flex justify-between items-center shadow-sm transition-colors ${isRecruiterView ? 'bg-gray-900 text-white' : 'bg-white border border-gray-100 text-gray-900'}`}>
            <div className="flex items-center gap-3">
               <div className={`p-2 rounded-full ${isRecruiterView ? 'bg-white/10' : 'bg-gray-100'}`}>
                  {isRecruiterView ? <Eye size={20} /> : <EyeOff size={20} />}
               </div>
               <div>
                  <h3 className="font-bold text-sm">Simulation Mode</h3>
                  <p className={`text-xs ${isRecruiterView ? 'text-gray-400' : 'text-gray-500'}`}>
                    {isRecruiterView ? 'Viewing as: Hiring Manager (Budget: 55k EGP)' : 'Viewing as: Candidate (You)'}
                  </p>
               </div>
            </div>
            
            <button 
                onClick={() => setIsRecruiterView(!isRecruiterView)}
                className="flex items-center gap-2 cursor-pointer group"
            >
                <span className={`text-xs font-bold ${isRecruiterView ? 'text-brand-400' : 'text-gray-400 group-hover:text-gray-600'}`}>
                    {isRecruiterView ? 'Recruiter View ON' : 'Switch to Recruiter View'}
                </span>
                {isRecruiterView ? 
                    <ToggleRight size={32} className="text-brand-400 fill-brand-400/20"/> : 
                    <ToggleLeft size={32} className="text-gray-300 group-hover:text-gray-400"/>
                }
            </button>
        </div>

        {/* WALLET DASHBOARD (Only visible to Candidate) */}
        {!isRecruiterView && user.wallet && (
            <WalletDashboard wallet={user.wallet} />
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Cover Photo */}
            <div className="h-32 bg-gradient-to-r from-brand-600 to-brand-800"></div>
            <div className="px-6 pb-2">
                <div className="relative flex justify-between items-end -mt-12 mb-4">
                    <img 
                        src={user.avatarUrl} 
                        className="w-32 h-32 rounded-full border-4 border-white bg-white"
                        alt="Profile"
                    />
                    {isRecruiterView ? (
                        <button 
                            onClick={() => setIsBookModalOpen(true)}
                            className="mb-4 px-6 py-2 bg-brand-600 text-white rounded-full font-bold shadow-lg shadow-brand-200 hover:bg-brand-700 hover:shadow-xl transition-all flex items-center gap-2"
                        >
                            <Calendar size={18} /> Book Interview
                        </button>
                    ) : (
                        <div className="flex gap-2 mb-4">
                            <button 
                                onClick={() => setIsSquadBuilderOpen(true)}
                                className="px-4 py-1.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-full font-bold text-sm hover:bg-purple-100 flex items-center gap-2"
                            >
                                <Users size={16} /> Create Squad
                            </button>
                            <button className="px-4 py-1.5 border border-gray-300 rounded-full text-gray-600 font-medium hover:bg-gray-50 text-sm">
                                Edit Profile
                            </button>
                        </div>
                    )}
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                    {/* RELIABILITY BADGE - DEMO OVERRIDE APPLIED */}
                    {displayShiftsBooked !== undefined && (
                        <TrustBadge completed={displayShiftsCompleted || 0} booked={displayShiftsBooked} size="sm" />
                    )}
                </div>

                <p className="text-lg text-gray-600 mb-2">{user.headline}</p>
                
                {/* Peer Verified Badges - HERO SECTION */}
                {user.softSkills && <SoftSkillBadges badges={user.softSkills} />}

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6 mt-4">
                    <span>{user.location}</span>
                    <span className="text-brand-600 font-medium cursor-pointer">Contact info</span>
                </div>

                {/* Internal Profile Tabs */}
                <div className="flex gap-6 border-b border-gray-100 mt-6">
                    <button 
                        onClick={() => setActiveTab('OVERVIEW')}
                        className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'OVERVIEW' ? 'border-brand-600 text-brand-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        <Layout size={16} /> Overview
                    </button>
                    <button 
                        onClick={() => setActiveTab('CHALLENGES')}
                        className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'CHALLENGES' ? 'border-brand-600 text-brand-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        <Code2 size={16} /> Challenges <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full text-[10px]">{user.challenges?.length || 0}</span>
                    </button>
                </div>
            </div>
        </div>

        {activeTab === 'OVERVIEW' ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                 <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold text-brand-900 mb-1">Open to work</h3>
                        <p className="text-sm text-brand-700">Software Engineer, Frontend Developer, Tech Lead</p>
                        <p className="text-sm text-brand-600 mt-1">See all details</p>
                    </div>

                    <div className="">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">About</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Passionate software engineer with a focus on building scalable web applications for the Egyptian market. 
                            Experienced in React, TypeScript, and Cloud Architecture. 
                            Proud AUC graduate with a drive to innovate in the local tech ecosystem.
                        </p>
                    </div>

                    {/* Languages & Verification */}
                    <div className="border-t border-gray-100 pt-6 mt-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            Languages & Verification
                            <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">AI Verified</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-brand-200 transition-colors">
                                <div>
                                    <p className="font-semibold text-gray-900 flex items-center gap-2">
                                        English
                                    </p>
                                    <p className="text-sm text-gray-500">Professional Proficiency (C1)</p>
                                </div>
                                <div className="flex items-center gap-1.5 px-2 py-1 bg-white text-green-700 border border-green-200 text-xs font-bold rounded-full shadow-sm">
                                    <Mic size={12} className="fill-green-700 text-green-700" />
                                    <span>Verified Voice</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-brand-200 transition-colors">
                                <div>
                                    <p className="font-semibold text-gray-900 flex items-center gap-2">
                                        Arabic
                                    </p>
                                    <p className="text-sm text-gray-500">Native (Egyptian)</p>
                                </div>
                                <div className="flex items-center gap-1.5 px-2 py-1 bg-white text-green-700 border border-green-200 text-xs font-bold rounded-full shadow-sm">
                                    <Mic size={12} className="fill-green-700 text-green-700" />
                                    <span>Verified Voice</span>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>

                {/* Skills Verification Section - NEW */}
                <SkillsSection user={user} isRecruiterView={isRecruiterView} />

                {/* Salary Expectations - Protected Section */}
                <SalarySection user={user} isRecruiterView={isRecruiterView} />

                {/* Work Style Section */}
                <WorkStyleSection initialData={user.workStyle} isRecruiterMode={isRecruiterView} />

                {/* Social Highlights - Culture Fit Gallery */}
                <SocialHighlights />

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Education</h3>
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                        <Building2 size={24} />
                        </div>
                        <div>
                        <h4 className="font-semibold text-gray-900">{user.university}</h4>
                        <p className="text-sm text-gray-600">Bachelor of Science, Computer Science</p>
                        <p className="text-sm text-gray-500">2016 - 2020</p>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="animate-in fade-in slide-in-from-right-2">
                {/* CHALLENGES TAB CONTENT */}
                <div className="mb-4 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg h-fit text-blue-600">
                        <Code2 size={24} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-blue-900">Proof of Work</h3>
                        <p className="text-xs text-blue-700 mt-1">
                            Showcase your technical capabilities with concrete examples. Code snippets for developers, case studies for designers.
                        </p>
                    </div>
                </div>
                
                <ChallengesSection challenges={user.challenges || []} isRecruiterView={isRecruiterView} />
            </div>
        )}

        {/* MODALS */}
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
