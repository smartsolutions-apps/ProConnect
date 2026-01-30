
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { AdminDashboard } from '../admin/AdminDashboard';
import { VideoRecorder } from '../profile/VideoRecorder';
import { ProfileView } from '../profile/ProfileView';
import { ApplicationsDashboard } from '../applications/ApplicationsDashboard';
import { Building2, UserCircle, Settings, Lock, FileText, UploadCloud, Users, CreditCard } from 'lucide-react';
import { JobBoard } from '../jobs/JobBoard';

export const SettingsHub: React.FC = () => {
  const { role, user } = useAuth();
  const [activeTab, setActiveTab] = React.useState('tab1');

  // --- RECRUITER VIEW RENDERER ---
  const renderRecruiterView = () => (
    <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Company Hub</h3>
                    <p className="text-xs text-gray-500">Manage your brand</p>
                </div>
                <nav className="p-2 space-y-1">
                    {[
                        { id: 'tab1', label: 'Company Brand', icon: Building2 },
                        { id: 'tab2', label: 'Job Manager', icon: FileText },
                        { id: 'tab3', label: 'Team Access', icon: Users },
                        { id: 'tab4', label: 'Billing', icon: CreditCard },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                activeTab === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <item.icon size={16} /> {item.label}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
        <div className="col-span-9">
            {activeTab === 'tab1' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg mx-auto flex items-center justify-center mb-4 border-2 border-dashed border-gray-300">
                        <UploadCloud size={32} className="text-gray-400" />
                    </div>
                    <h3 className="font-bold text-lg">Company Assets</h3>
                    <p className="text-sm text-gray-500 mb-6">Upload logo and cover photos</p>
                    <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg">Edit Profile</button>
                </div>
            )}
            {activeTab === 'tab2' && (
                <div className="space-y-4">
                     <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-blue-900">Active Listings</h3>
                            <p className="text-sm text-blue-700">You have 3 active jobs.</p>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg text-sm">+ Post New Job</button>
                     </div>
                     {/* Reusing JobBoard for display, but in reality would be a table */}
                     <JobBoard /> 
                </div>
            )}
            {activeTab === 'tab3' && <div className="p-12 text-center text-gray-400">Team Management Module</div>}
        </div>
    </div>
  );

  // --- SEEKER VIEW RENDERER ---
  const renderSeekerView = () => (
    <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
                    <img src={user.avatarUrl} className="w-10 h-10 rounded-full" />
                    <div>
                        <h3 className="font-bold text-gray-900 text-sm">{user.name}</h3>
                        <p className="text-xs text-gray-500">Candidate</p>
                    </div>
                </div>
                <nav className="p-2 space-y-1">
                    {[
                        { id: 'tab1', label: 'My Profile', icon: UserCircle },
                        { id: 'tab2', label: 'My Applications', icon: FileText },
                        { id: 'tab3', label: 'Video Pitch', icon: UploadCloud },
                        { id: 'tab4', label: 'Privacy', icon: Lock },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                activeTab === item.id ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <item.icon size={16} /> {item.label}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
        <div className="col-span-12 md:col-span-9">
             {activeTab === 'tab1' && <ProfileView user={user} />}
             {activeTab === 'tab2' && <ApplicationsDashboard />}
             {activeTab === 'tab3' && (
                 <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Record Your Video Pitch</h3>
                    <VideoRecorder onSave={(blob) => alert('Video Saved (Mock)')} />
                 </div>
             )}
             {activeTab === 'tab4' && (
                 <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Privacy Settings</h3>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <h4 className="font-bold text-gray-800">Blind Mode</h4>
                            <p className="text-sm text-gray-500">Hide my name and photo from recruiters until I accept.</p>
                        </div>
                        <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                        </div>
                    </div>
                 </div>
             )}
        </div>
    </div>
  );

  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen">
       {role === 'admin' && <AdminDashboard />}
       {role === 'company' && renderRecruiterView()}
       {role === 'seeker' && renderSeekerView()}
    </div>
  );
};
