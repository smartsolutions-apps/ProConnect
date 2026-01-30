
import React from 'react';
import { Bell, Briefcase, Wallet, Flame, MessageCircle, CheckCircle2, ChevronRight, X } from 'lucide-react';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'HIRED',
    title: 'Hired: Cairo ICT 2026',
    desc: 'Vodafone Egypt accepted your application for "Senior Promoter".',
    time: '2m ago',
    read: false
  },
  {
    id: 2,
    type: 'PAYMENT',
    title: 'Payment Received',
    desc: 'EGP 500 has been transferred to your wallet for "Sahara Expo Day 1".',
    time: '1h ago',
    read: false
  },
  {
    id: 3,
    type: 'URGENT',
    title: 'Urgent Replacement Needed',
    desc: 'Hall 3 needs a bilingual host immediately. +50% Surge Pay active.',
    time: '3h ago',
    read: true
  },
  {
    id: 4,
    type: 'MESSAGE',
    title: 'New Message from Sarah',
    desc: 'HR Director at Orange: "Can you join the briefing call tomorrow?"',
    time: '5h ago',
    read: true
  },
  {
    id: 5,
    type: 'VIEW',
    title: 'Profile View',
    desc: 'Recruiter from Emaar Misr viewed your profile.',
    time: '1d ago',
    read: true
  }
];

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'HIRED': return <Briefcase size={16} className="text-white" />;
      case 'PAYMENT': return <Wallet size={16} className="text-white" />;
      case 'URGENT': return <Flame size={16} className="text-white" />;
      case 'MESSAGE': return <MessageCircle size={16} className="text-white" />;
      default: return <CheckCircle2 size={16} className="text-white" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'HIRED': return 'bg-green-500';
      case 'PAYMENT': return 'bg-brand-500';
      case 'URGENT': return 'bg-red-500';
      case 'MESSAGE': return 'bg-purple-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="absolute top-16 right-0 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2 origin-top-right">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900">Notifications</h3>
            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">2 New</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={16} />
        </button>
      </div>

      {/* List */}
      <div className="max-h-[400px] overflow-y-auto">
        {NOTIFICATIONS.map((notif) => (
            <div 
                key={notif.id} 
                className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3 ${notif.read ? 'opacity-75' : 'bg-blue-50/30'}`}
            >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${getBgColor(notif.type)}`}>
                    {getIcon(notif.type)}
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                        <h4 className={`text-sm ${notif.read ? 'font-medium text-gray-800' : 'font-bold text-gray-900'}`}>
                            {notif.title}
                        </h4>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{notif.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                        {notif.desc}
                    </p>
                </div>
                {!notif.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                )}
            </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
        <button className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center justify-center gap-1 mx-auto">
            View All Activity <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
};
