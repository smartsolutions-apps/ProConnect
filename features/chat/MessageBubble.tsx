
import React from 'react';
import { ChatMessage } from '../../types';
import { ShieldCheck } from 'lucide-react';

interface MessageBubbleProps {
  message: ChatMessage;
  isMe: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isMe }) => {
  const isAdmin = message.role === 'admin';
  const isBroadcast = message.type === 'broadcast';

  // Admin/Broadcast messages are centered or distinct
  if (isBroadcast) {
    return (
      <div className="flex justify-center my-6">
        <div className="bg-gray-100 border border-gray-200 text-gray-600 text-xs px-4 py-1.5 rounded-full font-mono flex items-center gap-2 shadow-sm">
           <ShieldCheck size={12} /> {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex gap-3 mb-4 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
      <img 
        src={message.avatarUrl} 
        alt={message.senderName} 
        className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 border border-gray-100"
      />
      
      <div className={`max-w-[75%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2 mb-1 px-1">
            <span className={`text-[10px] font-bold ${isAdmin ? 'text-brand-600' : 'text-gray-500'}`}>
                {message.senderName}
            </span>
            {isAdmin && <ShieldCheck size={10} className="text-brand-600" />}
            <span className="text-[10px] text-gray-300">{message.timestamp}</span>
        </div>
        
        <div 
            className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                isAdmin 
                    ? 'bg-brand-50 text-brand-900 border border-brand-100 rounded-tl-none' 
                    : isMe 
                        ? 'bg-gray-900 text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
            }`}
        >
            {message.content}
        </div>
      </div>
    </div>
  );
};
