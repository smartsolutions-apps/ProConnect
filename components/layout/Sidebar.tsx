
import React from 'react';
import { User } from '../../types';
import { EyeOff } from 'lucide-react';

interface SidebarProps {
  user: User;
  isStealthMode?: boolean;
  onNavigate?: (tab: 'feed' | 'jobs' | 'profile' | 'applications') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ user, isStealthMode = false, onNavigate }) => {
  return (
    <div className={`rounded-xl shadow-sm border p-6 sticky top-24 transition-colors duration-300 ${isStealthMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <div className={`text-center border-b pb-4 mb-4 ${isStealthMode ? 'border-gray-700' : 'border-gray-100'}`}>
        <div className="relative inline-block">
          {isStealthMode ? (
              <div className="w-20 h-20 rounded-full mx-auto border-4 border-gray-700 bg-gray-600 flex items-center justify-center text-gray-300 shadow-sm">
                  <EyeOff size={32} />
              </div>
          ) : (
             <>
                <img 
                    src={user.avatarUrl} 
                    alt="Profile" 
                    className="w-20 h-20 rounded-full mx-auto border-4 border-white shadow-sm"
                />
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
             </>
          )}
        </div>
        <h3 className={`mt-3 text-lg font-bold ${isStealthMode ? 'text-white' : 'text-gray-900'}`}>
            {isStealthMode ? 'Anonymous Candidate' : user.name}
        </h3>
        <p className={`text-sm leading-tight px-4 ${isStealthMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {isStealthMode ? 'Senior Engineer @ Top Tech Co.' : user.headline}
        </p>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className={isStealthMode ? 'text-gray-400' : 'text-gray-500'}>Profile views</span>
          <span className="font-semibold text-brand-600">142</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className={isStealthMode ? 'text-gray-400' : 'text-gray-500'}>Post impressions</span>
          <span className="font-semibold text-brand-600">1.2k</span>
        </div>
        <div className={`pt-4 border-t ${isStealthMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isStealthMode ? 'text-gray-500' : 'text-gray-400'}`}>My Items</p>
          <div 
            onClick={() => onNavigate && onNavigate('applications')}
            className={`flex items-center gap-2 text-sm cursor-pointer py-1 ${isStealthMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-brand-600'}`}
          >
            <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
            My Applications (3)
          </div>
        </div>
      </div>
    </div>
  );
};
