
import React, { useState, useEffect, useRef } from 'react';
import { X, Users, Hash, Wifi } from 'lucide-react';
import { ChatMessage, User } from '../../types';
import { CHAT_HISTORY } from '../../data';
import { BroadcastBanner } from './BroadcastBanner';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';

interface EventChatRoomProps {
  eventId: string;
  eventName: string;
  currentUser: User;
  onClose: () => void;
  isAdmin?: boolean;
}

export const EventChatRoom: React.FC<EventChatRoomProps> = ({ eventId, eventName, currentUser, onClose, isAdmin = false }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(CHAT_HISTORY);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text: string, isBroadcast: boolean) => {
    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      senderName: isAdmin ? 'Command Center' : currentUser.name.split(' ')[0], // Short name for cleaner chat
      role: isAdmin ? 'admin' : 'user',
      type: isBroadcast ? 'broadcast' : 'message',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatarUrl: currentUser.avatarUrl
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // Find latest broadcast for banner
  const latestBroadcast = [...messages].reverse().find(m => m.type === 'broadcast');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#F8FAFC] rounded-2xl shadow-2xl w-full max-w-lg h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 border border-gray-200">
        
        {/* HEADER */}
        <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm z-20">
            <div>
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Hash size={16} className="text-gray-400" /> {eventName}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-bold text-green-600 flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full">
                        <Wifi size={10} /> Online
                    </span>
                    <span className="text-[10px] text-gray-500 flex items-center gap-1">
                        <Users size={10} /> 42/50 Staff
                    </span>
                </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                <X size={20} />
            </button>
        </div>

        {/* PINNED BROADCAST */}
        <BroadcastBanner message={latestBroadcast} />

        {/* MESSAGE STREAM */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#F8FAFC]" ref={scrollRef}>
            {messages.map((msg) => (
                <MessageBubble 
                    key={msg.id} 
                    message={msg} 
                    isMe={msg.senderId === currentUser.id} 
                />
            ))}
        </div>

        {/* INPUT AREA */}
        <ChatInput onSend={handleSend} isAdmin={isAdmin} />
      </div>
    </div>
  );
};
