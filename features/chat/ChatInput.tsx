
import React, { useState } from 'react';
import { Send, AlertTriangle, MessageSquare } from 'lucide-react';

interface ChatInputProps {
  onSend: (text: string, isBroadcast: boolean) => void;
  isAdmin: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isAdmin }) => {
  const [message, setMessage] = useState('');
  const [isBroadcast, setIsBroadcast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message, isBroadcast);
    setMessage('');
    setIsBroadcast(false); // Reset after send
  };

  return (
    <div className="p-4 bg-white border-t border-gray-100">
      {isAdmin && (
        <div className="flex items-center gap-2 mb-3 px-1">
            <label className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full cursor-pointer transition-colors ${isBroadcast ? 'bg-red-100 text-red-700 ring-1 ring-red-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                <input 
                    type="checkbox" 
                    checked={isBroadcast} 
                    onChange={(e) => setIsBroadcast(e.target.checked)}
                    className="sr-only"
                />
                <div className={`w-3 h-3 rounded-full border border-current ${isBroadcast ? 'bg-red-600' : 'bg-transparent'}`}></div>
                {isBroadcast ? 'BROADCAST MODE' : 'Broadcast Mode'}
            </label>
            {isBroadcast && <span className="text-[10px] text-red-500 animate-pulse">⚠️ Will notify everyone</span>}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className={`flex-1 relative rounded-xl border transition-all ${isBroadcast ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-200 focus-within:ring-2 focus-within:ring-brand-100 focus-within:border-brand-300'}`}>
            <input 
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={isBroadcast ? "Type urgent alert..." : "Type a message..."}
                className="w-full p-3 bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400"
            />
        </div>
        <button 
            type="submit" 
            disabled={!message.trim()}
            className={`p-3 rounded-xl flex items-center justify-center transition-all ${
                isBroadcast 
                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-200 shadow-lg' 
                    : 'bg-gray-900 hover:bg-gray-800 text-white shadow-gray-200 shadow-md'
            } disabled:opacity-50 disabled:shadow-none`}
        >
            {isBroadcast ? <AlertTriangle size={20} /> : <Send size={20} />}
        </button>
      </form>
    </div>
  );
};
