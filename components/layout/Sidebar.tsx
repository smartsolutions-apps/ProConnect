
import React from 'react';
import { User } from '../../types';
import { EyeOff, UserCircle, Settings, LogOut, ChevronRight } from 'lucide-react';

interface SidebarProps {
  user: User;
  isStealthMode?: boolean;
  onNavigate?: (tab: any) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ user, isStealthMode = false, onNavigate }) => {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl p-6 border border-slate-100 dark:border-[#333333] shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="relative group cursor-pointer" onClick={() => onNavigate?.('profile')}>
            {isStealthMode ? (
              <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-white">
                <EyeOff size={32} />
              </div>
            ) : (
              <img src={user.avatarUrl} alt="" className="w-20 h-20 rounded-full border-4 border-slate-50 dark:border-[#2d2d2d] object-cover shadow-sm group-hover:scale-105 transition-transform" />
            )}
          </div>
          <h3 className="mt-4 font-black text-slate-900 dark:text-white tracking-tight">
            {isStealthMode ? 'Anonymous' : user.name}
          </h3>
          <p className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mt-1">
            {user.careerLevel || 'Premium Seeker'}
          </p>
        </div>

        <div className="mt-8 space-y-1">
          <SidebarLink icon={<UserCircle size={18}/>} label="My Profile" onClick={() => onNavigate?.('profile')} />
          <SidebarLink icon={<Settings size={18}/>} label="Preferences" onClick={() => onNavigate?.('settings')} />
          <SidebarLink icon={<LogOut size={18}/>} label="Sign Out" danger />
        </div>
      </div>

      <div className="bg-indigo-600 rounded-3xl p-5 text-white shadow-xl shadow-indigo-200 dark:shadow-none">
        <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Pro Bonus</p>
        <h4 className="font-bold leading-tight mb-4">Complete your profile to unlock high-pay gigs</h4>
        <button className="w-full py-2.5 bg-white text-indigo-600 rounded-full text-xs font-black uppercase tracking-wider hover:bg-indigo-50 transition-colors">
          Start Wizard
        </button>
      </div>
    </div>
  );
};

const SidebarLink = ({ icon, label, onClick, danger }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between p-3 rounded-2xl transition-colors ${
      danger ? 'text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#2d2d2d] hover:text-slate-900 dark:hover:text-white'
    }`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-sm font-bold">{label}</span>
    </div>
    <ChevronRight size={14} className="opacity-40" />
  </button>
);
