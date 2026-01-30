
import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { RightSidebar } from './RightSidebar';
import { BottomNav } from './BottomNav';
import { User } from '../../types';

interface MainLayoutProps {
  children: React.ReactNode;
  user: User;
  activeTab: 'feed' | 'jobs' | 'profile' | 'settings';
  setActiveTab: (tab: any) => void;
  isStealthMode: boolean;
  toggleStealthMode: () => void;
  hideLeftSidebar?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, user, activeTab, setActiveTab, isStealthMode, toggleStealthMode, hideLeftSidebar = false 
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Desktop Header */}
      <div className="hidden lg:block">
        <Header 
            user={user} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isStealthMode={isStealthMode}
            toggleStealthMode={toggleStealthMode}
        />
      </div>

      {/* Mobile Top Bar (Simplified) */}
      <div className="lg:hidden sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-brand-600 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">P</div>
           <span className="font-bold text-gray-900 tracking-tight">ProConnect</span>
        </div>
        <img src={user.avatarUrl} className="w-8 h-8 rounded-full border border-gray-200" alt="Profile" onClick={() => setActiveTab('settings')}/>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Sidebar Navigation (Desktop Only) */}
          {!hideLeftSidebar && (
            <div className="hidden lg:block lg:col-span-3">
                <div className="sticky top-24 space-y-6">
                    <Sidebar 
                      user={user} 
                      isStealthMode={isStealthMode} 
                      onNavigate={(tab) => setActiveTab(tab)}
                    />
                </div>
            </div>
          )}

          {/* CENTER: Main Content */}
          <div className={`col-span-1 ${hideLeftSidebar ? 'lg:col-span-12' : 'lg:col-span-6'}`}>
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {children}
            </div>
          </div>

          {/* RIGHT: Widgets (Desktop Only) */}
          {!hideLeftSidebar && (
            <div className="hidden lg:block lg:col-span-3">
                <div className="sticky top-24">
                    <RightSidebar />
                </div>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
