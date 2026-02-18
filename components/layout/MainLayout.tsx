
import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { RightSidebar } from './RightSidebar';
import { BottomNav } from './BottomNav';
import { User } from '../../types';

interface MainLayoutProps {
  children: React.ReactNode;
  user: User;
  activeTab: any;
  setActiveTab: (tab: any) => void;
  isStealthMode: boolean;
  toggleStealthMode: () => void;
  hideLeftSidebar?: boolean;
  focusMode?: boolean; // New prop for Job Board focus
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children, user, activeTab, setActiveTab, isStealthMode, toggleStealthMode, hideLeftSidebar = false, focusMode = false
}) => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#121212] transition-colors duration-500">
      {/* Desktop Header */}
      <Header
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isStealthMode={isStealthMode}
        toggleStealthMode={toggleStealthMode}
      />

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 pb-24 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Sidebar */}
          {!hideLeftSidebar && (
            <div className={`
              ${focusMode ? 'hidden 2xl:block 2xl:col-span-3' : 'hidden lg:block lg:col-span-3 2xl:col-span-2'}
            `}>
              <div className="sticky top-24">
                <Sidebar user={user} isStealthMode={isStealthMode} onNavigate={setActiveTab} />
              </div>
            </div>
          )}

          {/* Content */}
          <div className={`col-span-1 ${hideLeftSidebar
              ? 'lg:col-span-12'
              : focusMode
                ? 'col-span-12 lg:col-span-10 lg:col-start-2 2xl:col-span-6 2xl:col-start-auto'
                : 'col-span-12 lg:col-span-9 xl:col-span-6 2xl:col-span-8'
            }`}>
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
              {children}
            </div>
          </div>

          {/* Right Bar */}
          {!hideLeftSidebar && (
            <div className={`
              ${focusMode ? 'hidden 2xl:block 2xl:col-span-3' : 'hidden xl:block xl:col-span-3 2xl:col-span-2'}
            `}>
              <div className="sticky top-24">
                <RightSidebar />
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
