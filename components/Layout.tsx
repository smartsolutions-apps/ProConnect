import React from 'react';
import { Home, Briefcase, MessageSquare, Bell, User, Search, Menu } from 'lucide-react';
import { CURRENT_USER } from '../data/seedData';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'feed' | 'jobs' | 'profile';
  setActiveTab: (tab: 'feed' | 'jobs' | 'profile') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight hidden sm:block">
                ProConnect<span className="text-brand-600">.eg</span>
              </span>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center flex-1 max-w-xs mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="Search jobs, companies..."
                />
              </div>
            </div>

            {/* Nav Links */}
            <div className="flex items-center gap-1 sm:gap-6">
              <NavButton 
                icon={<Home size={22} />} 
                label="Home" 
                active={activeTab === 'feed'} 
                onClick={() => setActiveTab('feed')} 
              />
              <NavButton 
                icon={<Briefcase size={22} />} 
                label="Jobs" 
                active={activeTab === 'jobs'} 
                onClick={() => setActiveTab('jobs')} 
              />
              <NavButton 
                icon={<MessageSquare size={22} />} 
                label="Messaging" 
                active={false}
              />
              <NavButton 
                icon={<Bell size={22} />} 
                label="Notifications" 
                active={false}
              />
              
              <div className="ml-2 border-l pl-4 border-gray-200 flex items-center gap-3">
                 <img 
                  src={CURRENT_USER.avatarUrl} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full border border-gray-200 cursor-pointer"
                  onClick={() => setActiveTab('profile')}
                />
                <div className="hidden lg:block leading-tight">
                  <p className="text-xs font-bold text-gray-900">{CURRENT_USER.name}</p>
                  <p className="text-[10px] text-gray-500">Premium</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-0 sm:px-4 py-6">
        {children}
      </main>
    </div>
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