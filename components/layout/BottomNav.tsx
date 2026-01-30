
import React from 'react';
import { Home, Briefcase, UserCircle, Calendar, Trophy, QrCode, TrendingUp } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'feed' | 'jobs' | 'events' | 'profile' | 'settings' | 'scan' | 'rankings' | 'improve';
  setActiveTab: (tab: any) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'feed', icon: Home, label: 'Home' },
    { id: 'jobs', icon: Briefcase, label: 'Jobs' },
    { id: 'scan', icon: QrCode, label: 'Scan', isAction: true },
    { id: 'improve', icon: TrendingUp, label: 'Improve' },
    { id: 'profile', icon: UserCircle, label: 'You' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200 px-6 py-2 pb-safe z-50 lg:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          if (item.isAction) {
            return (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="flex flex-col items-center justify-center -mt-6"
              >
                <div className="w-14 h-14 bg-gray-900 rounded-full shadow-lg shadow-gray-400 flex items-center justify-center transform transition-transform active:scale-95 border-4 border-[#F8FAFC]">
                  <Icon className="text-white" size={24} />
                </div>
                <span className="text-[10px] font-bold text-gray-600 mt-1">{item.label}</span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                isActive ? 'text-brand-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon 
                size={24} 
                className={`transition-all ${isActive ? 'fill-brand-100 stroke-brand-600' : ''}`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-[10px] font-medium mt-0.5 ${isActive ? 'text-brand-600' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
