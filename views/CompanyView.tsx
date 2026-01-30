
import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { JobBoard } from '../features/jobs/JobBoard';
import { Building2, FileText, Users, CreditCard, UploadCloud, Calendar, ChevronRight, QrCode, Copy } from 'lucide-react';
import { User } from '../types';
import { EVENTS, USERS, SQUADS } from '../data';
import { ShiftManager } from '../features/shifts/ShiftManager';
import { SquadApplicationCard } from '../features/squads/SquadApplicationCard';
import { EventCloningModal } from '../features/hiring/EventCloningModal';

// NOTE: Companies have a different layout than seekers (No sidebars usually)
export const CompanyView: React.FC<{ user: User }> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [subTab, setSubTab] = useState('shifts'); // Defaulting to Shift Manager for Demo
  const [isCloneModalOpen, setIsCloneModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <Header 
        user={user} 
        activeTab={'settings'} 
        setActiveTab={() => {}} 
        isStealthMode={false} 
        toggleStealthMode={() => {}} 
      />
      
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                    <div className="p-4 bg-gray-50 border-b border-gray-100">
                        <h3 className="font-bold text-gray-900">Company Hub</h3>
                        <p className="text-xs text-gray-500">Vodafone Egypt</p>
                    </div>
                    <nav className="p-2 space-y-1">
                        {[
                            { id: 'shifts', label: 'Shift Manager', icon: QrCode }, 
                            { id: 'events', label: 'My Exhibitions', icon: Calendar },
                            { id: 'brand', label: 'Company Brand', icon: Building2 },
                            { id: 'jobs', label: 'Job Manager', icon: FileText },
                            { id: 'team', label: 'Team Access', icon: Users },
                            { id: 'billing', label: 'Billing', icon: CreditCard },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setSubTab(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                    subTab === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <item.icon size={16} /> {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="col-span-9">
                {subTab === 'shifts' && <ShiftManager />}

                {subTab === 'events' && (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                            <div className="relative z-10 flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">My Exhibition Pools</h2>
                                    <p className="text-blue-100">Access the shared talent pool for upcoming events.</p>
                                </div>
                                <button 
                                    onClick={() => setIsCloneModalOpen(true)}
                                    className="px-4 py-2 bg-white text-blue-700 font-bold rounded-xl shadow-md hover:bg-blue-50 transition-colors flex items-center gap-2"
                                >
                                    <Copy size={18} /> Re-Hire Team
                                </button>
                            </div>
                        </div>

                        {/* NEW SQUAD APPLICATIONS SECTION */}
                        <div className="mb-8">
                            <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                                <Users size={20} className="text-purple-600" /> Squad Applications (New!)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {SQUADS.map(squad => (
                                    <SquadApplicationCard 
                                        key={squad.id} 
                                        squad={squad} 
                                        onHire={(id) => alert(`Hired Squad: ${id}`)} 
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {EVENTS.slice(0, 3).map(event => (
                                <div key={event.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex gap-4">
                                            <img src={event.imageUrl} className="w-16 h-16 rounded-lg object-cover" />
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-900">{event.name}</h3>
                                                <p className="text-sm text-gray-500">{event.date} • {event.venue}</p>
                                                <div className="flex gap-2 mt-2">
                                                    <span className="text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded-full font-bold">Attending</span>
                                                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-bold">Booth A-24</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-brand-600">842</p>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">Candidates in Pool</p>
                                        </div>
                                    </div>

                                    {/* Mini Candidate List (Mock) */}
                                    <div className="bg-gray-50 rounded-lg p-3">
                                        <p className="text-xs font-bold text-gray-500 uppercase mb-2">Recent Pool Applicants</p>
                                        <div className="flex -space-x-2 overflow-hidden mb-3">
                                            {USERS.slice(0, 5).map(u => (
                                                <img key={u.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src={u.avatarUrl} alt={u.name} />
                                            ))}
                                            <div className="h-8 w-8 rounded-full bg-gray-200 ring-2 ring-white flex items-center justify-center text-xs text-gray-500 font-bold">+800</div>
                                        </div>
                                        <button className="w-full py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1">
                                            View All Candidates <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {subTab === 'brand' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg mx-auto flex items-center justify-center mb-4 border-2 border-dashed border-gray-300">
                            <UploadCloud size={32} className="text-gray-400" />
                        </div>
                        <h3 className="font-bold text-lg">Company Assets</h3>
                        <p className="text-sm text-gray-500 mb-6">Upload logo and cover photos</p>
                        <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg">Edit Profile</button>
                    </div>
                )}
                {subTab === 'jobs' && (
                    <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-blue-900">Active Listings</h3>
                                <p className="text-sm text-blue-700">You have 3 active jobs.</p>
                            </div>
                            <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg text-sm">+ Post New Job</button>
                        </div>
                        <JobBoard /> 
                    </div>
                )}
            </div>
        </div>

        {/* CLONING MODAL */}
        <EventCloningModal 
            isOpen={isCloneModalOpen}
            onClose={() => setIsCloneModalOpen(false)}
            sourceEventName="Cairo ICT 2026"
        />
      </main>
    </div>
  );
};
