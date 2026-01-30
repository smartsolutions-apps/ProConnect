
import React from 'react';
import { AlertTriangle, Megaphone } from 'lucide-react';
import { ChatMessage } from '../../types';

interface BroadcastBannerProps {
  message: ChatMessage | undefined;
}

export const BroadcastBanner: React.FC<BroadcastBannerProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-50 border-b border-red-100 p-4 sticky top-0 z-10 shadow-sm animate-in slide-in-from-top-2">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-red-100 rounded-lg text-red-600 animate-pulse flex-shrink-0">
          <Megaphone size={20} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <h4 className="text-red-900 font-bold text-sm uppercase tracking-wide flex items-center gap-2">
              <AlertTriangle size={12} /> Priority Broadcast
            </h4>
            <span className="text-red-400 text-[10px] font-mono">{message.timestamp}</span>
          </div>
          <p className="text-red-800 text-sm font-medium leading-relaxed">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
};
