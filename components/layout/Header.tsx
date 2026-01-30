
import React, { useState, useRef, useEffect } from 'react';
import { Home, Briefcase, MessageSquare, Bell, Search, Mic, Eye, EyeOff, Calendar, CheckCircle2, AlertCircle, Clock, Shield, Building2, Trophy } from 'lucide-react';
import { User, UserAvailability } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useDemo } from '../../context/DemoContext';
import { NotificationDropdown } from './NotificationDropdown';

interface HeaderProps {
  user: User;
  activeTab: 'feed' | 'jobs' | 'events' | 'profile' | 'settings' | 'rankings';
  setActiveTab: (tab: 'feed' | 'jobs' | 'events' | 'profile' | 'settings' | 'rankings') => void;
  isStealthMode: boolean;
  toggleStealthMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, activeTab, setActiveTab, isStealthMode, toggleStealthMode }) => {
  const { role } = useAuth();
  const { isDemoMode, demoValues } = useDemo();
  const [isListening, setIsListening] = useState(false);
  const [availability, setAvailability] = useState<UserAvailability>(user.availability || UserAvailability.OPEN_TO_OFFERS);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // DEMO OVERRIDE: Notifications
  const notificationCount = isDemoMode ? demoValues.notifications : 2;

  const handleVoiceSearch = () => {
      setIsListening(true);
      setTimeout(() => setIsListening(false), 2000); // Simulating listening
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setIsStatusOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getFutureDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  const getStatusColor = (status: UserAvailability) => {
    switch (status) {
      case UserAvailability.IMMEDIATELY: return 'bg-green-100 text-green-700 border-green-200';
      case UserAvailability.ONE_MONTH_NOTICE: return 'bg-amber-100 text-amber-700 border-amber-200';
      case UserAvailability.OPEN_TO_OFFERS: return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: UserAvailability) => {
    switch (status) {
      case UserAvailability.IMMEDIATELY: return <CheckCircle2 size={12} />;
      case UserAvailability.ONE_MONTH_NOTICE: return <Clock size={12} />;
      case UserAvailability.OPEN_TO_OFFERS: return <Briefcase size={12} />;
    }
  };

  return (
    <nav className={`sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm transition-colors duration-300 ${role === 'admin' ? 'border-red-600 border-b-4' : ''}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('feed')}>
            <div className={`w-8 h-8 rounded-md flex items-center justify-center ${role === 'admin' ? 'bg-red-600' : role === 'company' ? 'bg-blue-600' : 'bg-brand-600'}`}>
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight hidden sm:block">
              ProConnect<span className={`${role === 'admin' ? 'text-red-600' : role === 'company' ? 'text-blue-600' : 'text-brand-600'}`}>.eg</span>
            </span>
            {role === 'admin' && <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold uppercase ml-2">Admin</span>}
            {role === 'company' && <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold uppercase ml-2">Recruiter</span>}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-xs mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder={isListening ? "Listening..." : "Search jobs, companies..."}
              />
              <button 
                onClick={handleVoiceSearch}
                className={`absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:text-brand-600 ${isListening ? 'text-brand-600 animate-pulse' : 'text-gray-400'}`}
              >
                <Mic size={18} />
              </button>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-1 sm:gap-6">
            
            {/* Availability Status Indicator (Only for Seekers) */}
            {role === 'seeker' && (
                <div className="relative hidden lg:block" ref={statusDropdownRef}>
                <button
                    onClick={() => setIsStatusOpen(!isStatusOpen)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${getStatusColor(availability)}`}
                >
                    {getStatusIcon(availability)}
                    <span>
                    {availability === UserAvailability.ONE_MONTH_NOTICE 
                        ? `Starts: ${getFutureDate(30)}` 
                        : availability}
                    </span>
                </button>

                {isStatusOpen && (
                    <div className="absolute top-full mt-2 right-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 z-50">
                    <div className="p-3 bg-gray-50 border-b border-gray-100">
                        <p className="text-xs font-bold text-gray-500 uppercase">Set Availability</p>
                    </div>
                    <div className="p-1">
                        {[
                        { type: UserAvailability.IMMEDIATELY, label: 'Immediately', sub: 'Ready to start now' },
                        { type: UserAvailability.ONE_MONTH_NOTICE, label: '1 Month Notice', sub: `Available by ${getFutureDate(30)}` },
                        { type: UserAvailability.OPEN_TO_OFFERS, label: 'Open to Offers', sub: 'Casual browsing' }
                        ].map((opt) => (
                        <button
                            key={opt.type}
                            onClick={() => { setAvailability(opt.type); setIsStatusOpen(false); }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-start gap-3 hover:bg-gray-50 transition-colors ${availability === opt.type ? 'bg-brand-50' : ''}`}
                        >
                            <div className={`mt-0.5 ${availability === opt.type ? 'text-brand-600' : 'text-gray-400'}`}>
                            {getStatusIcon(opt.type)}
                            </div>
                            <div>
                            <p className={`font-semibold ${availability === opt.type ? 'text-brand-700' : 'text-gray-900'}`}>{opt.label}</p>
                            <p className="text-xs text-gray-500">{opt.sub}</p>
                            </div>
                        </button>
                        ))}
                    </div>
                    </div>
                )}
                </div>
            )}

            {role === 'seeker' && (
                <div className="flex items-center mr-2 border-r border-gray-200 pr-4">
                    <button 
                        onClick={toggleStealthMode}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${isStealthMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        title="Toggle Stealth Mode (Anonymous Browsing)"
                    >
                        {isStealthMode ? <EyeOff size={14}/> : <Eye size={14}/>}
                        <span className="hidden lg:inline">{isStealthMode ? 'Stealth ON' : 'Stealth OFF'}</span>
                    </button>
                </div>
            )}

            <NavButton 
              icon={<Home size={22} />} 
              label="Home" 
              active={activeTab === 'feed'} 
              onClick={() => setActiveTab('feed')} 
            />
            {role !== 'admin' && (
                <>
                <NavButton 
                  icon={<Briefcase size={22} />} 
                  label="Jobs" 
                  active={activeTab === 'jobs'} 
                  onClick={() => setActiveTab('jobs')} 
                />
                <NavButton 
                  icon={<Calendar size={22} />} 
                  label="Expos" 
                  active={activeTab === 'events'} 
                  onClick={() => setActiveTab('events')} 
                />
                <NavButton 
                  icon={<Trophy size={22} />} 
                  label="Leaders" 
                  active={activeTab === 'rankings'} 
                  onClick={() => setActiveTab('rankings')} 
                />
                </>
            )}
            
            {/* Notification Button */}
            <div className="relative" ref={notificationRef}>
                <NavButton 
                    icon={<Bell size={22} />} 
                    label="Notifications" 
                    active={isNotificationsOpen}
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                />
                {notificationCount > 0 && (
                    <div className="absolute top-0 right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white animate-bounce pointer-events-none">
                        {notificationCount}
                    </div>
                )}
                
                {/* Dropdown */}
                <NotificationDropdown 
                    isOpen={isNotificationsOpen} 
                    onClose={() => setIsNotificationsOpen(false)} 
                />
            </div>
            
            {/* Dynamic Profile/Settings Link */}
            <div className="ml-2 border-l pl-4 border-gray-200 flex items-center gap-3">
                {role === 'admin' ? (
                     <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('settings')}>
                         <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white">
                             <Shield size={16} />
                         </div>
                         <div className="hidden lg:block leading-tight">
                            <p className="text-xs font-bold text-gray-900">Admin</p>
                            <p className="text-[10px] text-gray-500">Dashboard</p>
                         </div>
                     </div>
                ) : role === 'company' ? (
                     <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('settings')}>
                         <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                             <Building2 size={16} />
                         </div>
                         <div className="hidden lg:block leading-tight">
                            <p className="text-xs font-bold text-gray-900">Vodafone</p>
                            <p className="text-[10px] text-gray-500">Recruiter</p>
                         </div>
                     </div>
                ) : (
                    // Seeker Profile
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('settings')}>
                        {isStealthMode ? (
                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white">
                                <EyeOff size={16} />
                            </div>
                        ) : (
                            <img 
                                src={user.avatarUrl} 
                                alt="Profile" 
                                className="w-8 h-8 rounded-full border border-gray-200"
                            />
                        )}
                        <div className="hidden lg:block leading-tight">
                            <p className="text-xs font-bold text-gray-900">
                                {isStealthMode ? 'Anonymous' : user.name.split(' ')[0]}
                            </p>
                            <p className="text-xs text-gray-500">Premium</p>
                        </div>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavButton = ({ icon, label, active = false, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center px-3 py-1 rounded-md transition-colors ${
      active 
        ? 'text-brand-600' 
        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
    }`}
  >
    {icon}
    <span className="hidden sm:block text-[10px] font-medium mt-0.5">{label}</span>
  </button>
);
