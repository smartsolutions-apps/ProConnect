
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDemo } from '../../context/DemoContext';
import { Shield, User, Building2, Settings, ChevronUp, Zap } from 'lucide-react';
import { UserRole } from '../../types';
import { useNavigate, useParams } from 'react-router-dom';

export const RoleSwitcher: React.FC = () => {
  const { role, switchRole } = useAuth();
  const { isDemoMode, toggleDemoMode } = useDemo();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { lang = 'en' } = useParams();

  const handleRoleSwitch = (newRole: UserRole) => {
    switchRole(newRole);
    setIsOpen(false);
    // Force navigation to the appropriate view
    if (newRole === 'admin') {
      navigate(`/${lang}/admin`);
    } else if (newRole === 'company') {
      navigate(`/${lang}/recruiter`);
    } else {
      navigate(`/${lang}/jobs`);
    }
  };

  const getIcon = (r: UserRole) => {
    switch (r) {
      case 'admin': return <Shield size={18} className="text-red-500" />;
      case 'company': return <Building2 size={18} className="text-blue-500" />;
      default: return <User size={18} className="text-green-500" />;
    }
  };

  const getLabel = (r: UserRole) => {
    switch (r) {
      case 'admin': return 'Super Admin';
      case 'company': return 'Recruiter';
      default: return 'Job Seeker';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden min-w-[220px] animate-in slide-in-from-bottom-5">
          {/* Demo Toggle */}
          <div className={`px-4 py-3 flex items-center justify-between cursor-pointer border-b border-gray-100 transition-colors ${isDemoMode ? 'bg-amber-50' : 'bg-gray-50'}`} onClick={toggleDemoMode}>
            <div className="flex items-center gap-2">
              <Zap size={16} className={isDemoMode ? 'text-amber-600 fill-amber-600' : 'text-gray-400'} />
              <span className={`text-xs font-bold uppercase tracking-wider ${isDemoMode ? 'text-amber-700' : 'text-gray-500'}`}>
                {isDemoMode ? 'Demo Active' : 'Demo Mode'}
              </span>
            </div>
            <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${isDemoMode ? 'bg-amber-500' : 'bg-gray-300'}`}>
              <div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform ${isDemoMode ? 'translate-x-4' : 'translate-x-0'}`}></div>
            </div>
          </div>

          <div className="bg-gray-900 px-4 py-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Role Switcher</p>
          </div>
          <div className="p-1">
            {(['seeker', 'company', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => handleRoleSwitch(r)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg ${role === r ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {getIcon(r)}
                {getLabel(r)}
                {role === r && <div className="ml-auto w-2 h-2 rounded-full bg-green-500"></div>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Global Demo Toast Overlay */}
      {isDemoMode && !isOpen && (
        <div className="fixed top-24 right-6 bg-amber-500 text-white px-4 py-2 rounded-full shadow-lg text-xs font-bold flex items-center gap-2 animate-bounce z-50 pointer-events-none">
          <Zap size={12} fill="white" /> PRESENTATION MODE
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-3 text-white rounded-full shadow-xl transition-all hover:scale-105 border border-gray-700 ${isDemoMode ? 'bg-amber-600 hover:bg-amber-700' : 'bg-gray-900 hover:bg-gray-800'}`}
      >
        <Settings size={18} className={isOpen ? 'rotate-90 transition-transform' : ''} />
        <span className="font-bold text-sm hidden sm:block">Dev Mode: {getLabel(role)}</span>
        <ChevronUp size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
};
