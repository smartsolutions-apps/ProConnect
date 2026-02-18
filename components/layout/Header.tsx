
import React, { useState, useRef, useEffect } from 'react';
import { Home, Briefcase, MessageSquare, Bell, Search, Mic, Eye, EyeOff, Calendar, CheckCircle2, Moon, Sun, Shield, Building2, Trophy, LogIn, ChevronDown, User as UserIcon, Settings, PlusCircle, Users } from 'lucide-react';
import { User, UserAvailability } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useDemo } from '../../context/DemoContext';
import { useTheme } from '../../context/ThemeProvider';
import { NotificationDropdown } from './NotificationDropdown';
import { useNavigate, useParams } from 'react-router-dom';

interface HeaderProps {
  user: User;
  activeTab: 'feed' | 'jobs' | 'events' | 'profile' | 'settings' | 'rankings' | 'automation' | 'applicants';
  setActiveTab: (tab: any) => void;
  isStealthMode: boolean;
  toggleStealthMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, activeTab, setActiveTab, isStealthMode, toggleStealthMode }) => {
  const { role } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { isDemoMode, demoValues } = useDemo();
  const navigate = useNavigate();
  const { lang = 'en' } = useParams();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const notificationCount = isDemoMode ? demoValues.notifications : 2;

  // ... (keep useEffect for clicks outside)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (path: string, tab: any) => {
    setActiveTab(tab);
    navigate(`/${lang}/${path}`);
  };

  // --- DYNAMIC BRANDING & ROUTING ---
  const getHomeRoute = () => {
    if (role === 'admin') return `/${lang}/admin`;
    if (role === 'company') return `/${lang}/recruiter`;
    return `/${lang}/`;
  };

  const homeRoute = getHomeRoute();

  // --- DYNAMIC NAV BUTTONS ---
  const renderNavButtons = () => {
    if (role === 'admin') {
      return (
        <>
          <NavButton
            icon={<Shield size={20} />}
            label="Dashboard"
            active={activeTab === 'feed' || !activeTab}
            onClick={() => handleNavClick('admin', 'feed')}
          />
          <NavButton
            icon={<Settings size={20} />}
            label="Settings"
            active={activeTab === 'settings'}
            onClick={() => handleNavClick('admin/settings', 'settings')}
          />
        </>
      );
    } else if (role === 'company') {
      return (
        <>
          <NavButton
            icon={<Building2 size={20} />}
            label="Hub"
            active={activeTab === 'profile'}
            onClick={() => handleNavClick('recruiter', 'profile')}
          />
          <NavButton
            icon={<PlusCircle size={20} />}
            label="Post Job"
            active={activeTab === 'jobs'}
            onClick={() => handleNavClick('recruiter/post-job', 'jobs')}
          />
          <NavButton
            icon={<Users size={20} />}
            label="Applicants"
            active={activeTab === 'applicants'}
            onClick={() => handleNavClick('recruiter/applicants', 'applicants')}
          />
        </>
      );
    } else {
      // Seeker (Default)
      return (
        <>
          <NavButton
            icon={<Home size={20} />}
            active={activeTab === 'feed'}
            onClick={() => handleNavClick('', 'feed')}
          />
          <NavButton
            icon={<Briefcase size={20} />}
            active={activeTab === 'jobs'}
            onClick={() => handleNavClick('jobs', 'jobs')}
          />
          <NavButton
            icon={<Calendar size={20} />}
            active={activeTab === 'events'}
            onClick={() => handleNavClick('events', 'events')}
          />
        </>
      );
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#1e1e1e]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#333333] transition-all">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Brand Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate(homeRoute)}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-active:scale-95 ${role === 'admin' ? 'bg-rose-500' : 'bg-indigo-600'}`}>
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight hidden sm:block">
              ProConnect<span className="text-indigo-600 dark:text-indigo-400">.eg</span>
            </span>
          </div>

          {/* Clean Search (Hidden for Admins/Recruiters maybe? Or kept generic) */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-10">
            <div className="relative w-full group">
              <Search size={18} className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-[#2d2d2d] border-transparent rounded-full text-sm placeholder-slate-500 focus:bg-white dark:focus:bg-[#3d3d3d] focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-white"
                placeholder={role === 'admin' ? "Search system..." : role === 'company' ? "Search candidates..." : "Search gigs, experts..."}
              />
            </div>
          </div>

          {/* Navigation & Controls */}
          <div className="flex items-center gap-2 sm:gap-4">

            <a
              href="/en/tour"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#222] border border-indigo-100 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
            >
              <span>🚀</span> Platform Tour
            </a>

            <div className="flex items-center bg-slate-100 dark:bg-[#2d2d2d] p-1 rounded-full border border-slate-200 dark:border-[#333333]">
              {renderNavButtons()}
            </div>

            <div className="h-6 w-px bg-slate-200 dark:bg-[#333333] mx-1"></div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#333333] rounded-full transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`p-2 rounded-full relative ${isNotificationsOpen ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#333333]'}`}
              >
                <Bell size={20} />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-[#1e1e1e]">
                    {notificationCount}
                  </span>
                )}
              </button>
              <NotificationDropdown isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
            </div>

            {/* Profile / Auth */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 pl-1 pr-3 py-1 bg-slate-50 dark:bg-[#2d2d2d] hover:bg-slate-100 dark:hover:bg-[#3d3d3d] border border-slate-200 dark:border-[#333333] rounded-full transition-all group"
              >
                <img src={user.avatarUrl} className="w-7 h-7 rounded-full object-cover border border-white dark:border-[#1e1e1e]" alt="" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 hidden lg:block">{user.name.split(' ')[0]}</span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#1e1e1e] rounded-xl shadow-xl border border-slate-100 dark:border-[#333] overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-[#2d2d2d]">
                    <div className="flex items-center gap-3 mb-2">
                      <img src={user.avatarUrl} className="w-10 h-10 rounded-full object-cover" alt="" />
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{user.name}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate w-32">{user.headline}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const path = role === 'admin' ? `/${lang}/admin/settings` : `/${lang}/settings`;
                        navigate(path);
                        setIsProfileOpen(false);
                      }}
                      className="w-full py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      View Profile
                    </button>
                  </div>

                  <div className="py-1">
                    <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Account</div>
                    <button
                      onClick={() => {
                        const path = role === 'admin' ? `/${lang}/admin/settings` : `/${lang}/settings`;
                        navigate(path);
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#2d2d2d] hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      Settings & Privacy
                    </button>
                  </div>

                  <div className="border-t border-slate-100 dark:border-[#2d2d2d] py-1">
                    <button className="w-full text-left px-4 py-2.5 text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#2d2d2d] transition-colors">
                      Sign Out
                    </button>
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

const NavButton = ({ icon, active, onClick, label }: any) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full transition-all flex items-center gap-2 ${active
      ? 'bg-white dark:bg-[#3d3d3d] text-indigo-600 dark:text-indigo-400 shadow-sm px-3'
      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
      }`}
    title={label}
  >
    {icon}
    {active && label && <span className="text-xs font-bold">{label}</span>}
  </button>
);
