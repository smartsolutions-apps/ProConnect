
import React, { useState, useRef, useEffect } from 'react';
import { Home, Briefcase, MessageSquare, Bell, Search, Mic, Eye, EyeOff, Calendar, CheckCircle2, Moon, Sun, Shield, Building2, Trophy, LogIn } from 'lucide-react';
import { User, UserAvailability } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useDemo } from '../../context/DemoContext';
import { useTheme } from '../../context/ThemeProvider';
import { NotificationDropdown } from './NotificationDropdown';

interface HeaderProps {
  user: User;
  activeTab: 'feed' | 'jobs' | 'events' | 'profile' | 'settings' | 'rankings';
  setActiveTab: (tab: any) => void;
  isStealthMode: boolean;
  toggleStealthMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, activeTab, setActiveTab, isStealthMode, toggleStealthMode }) => {
  const { role } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { isDemoMode, demoValues } = useDemo();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const notificationCount = isDemoMode ? demoValues.notifications : 2;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#1e1e1e]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#333333] transition-all">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setActiveTab('feed')}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-active:scale-95 ${role === 'admin' ? 'bg-rose-500' : 'bg-indigo-600'}`}>
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight hidden sm:block">
              ProConnect<span className="text-indigo-600 dark:text-indigo-400">.eg</span>
            </span>
          </div>

          {/* Clean Search */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-10">
            <div className="relative w-full group">
              <Search size={18} className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-[#2d2d2d] border-transparent rounded-full text-sm placeholder-slate-500 focus:bg-white dark:focus:bg-[#3d3d3d] focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-white"
                placeholder="Search gigs, experts..."
              />
            </div>
          </div>

          {/* Navigation & Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            <div className="flex items-center bg-slate-100 dark:bg-[#2d2d2d] p-1 rounded-full border border-slate-200 dark:border-[#333333]">
              <NavButton icon={<Home size={20} />} active={activeTab === 'feed'} onClick={() => setActiveTab('feed')} />
              <NavButton icon={<Briefcase size={20} />} active={activeTab === 'jobs'} onClick={() => setActiveTab('jobs')} />
              <NavButton icon={<Calendar size={20} />} active={activeTab === 'events'} onClick={() => setActiveTab('events')} />
            </div>

            <div className="h-6 w-px bg-slate-200 dark:bg-[#333333] mx-1"></div>

            <button 
              onClick={toggleTheme}
              className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#333333] rounded-full transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`p-2 rounded-full transition-colors relative ${isNotificationsOpen ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#333333]'}`}
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
            <button 
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 pl-1 pr-3 py-1 bg-slate-50 dark:bg-[#2d2d2d] hover:bg-slate-100 dark:hover:bg-[#3d3d3d] border border-slate-200 dark:border-[#333333] rounded-full transition-all group"
            >
              <img src={user.avatarUrl} className="w-7 h-7 rounded-full object-cover border border-white dark:border-[#1e1e1e]" alt="" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 hidden lg:block">{user.name.split(' ')[0]}</span>
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
};

const NavButton = ({ icon, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`p-2 rounded-full transition-all ${
      active 
        ? 'bg-white dark:bg-[#3d3d3d] text-indigo-600 dark:text-indigo-400 shadow-sm' 
        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
    }`}
  >
    {icon}
  </button>
);
