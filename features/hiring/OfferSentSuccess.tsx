
import React from 'react';
import { CheckCircle2, Send, Users, ArrowRight } from 'lucide-react';

interface OfferSentSuccessProps {
  count: number;
  eventName: string;
  onClose: () => void;
}

export const OfferSentSuccess: React.FC<OfferSentSuccessProps> = ({ count, eventName, onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-300">
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-xl relative">
        <Send size={40} className="relative z-10" />
        <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-ping opacity-75"></div>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Offers Sent!</h2>
      <p className="text-gray-500 mb-8 max-w-sm">
        🚀 Success! We just sent direct offers to <strong>{count} top performers</strong> for {eventName}.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 w-full max-w-sm mb-8 flex items-center gap-4">
         <div className="p-3 bg-blue-100 text-blue-700 rounded-lg">
            <Users size={24} />
         </div>
         <div className="text-left">
            <p className="text-xs font-bold text-blue-800 uppercase">Staffing Progress</p>
            <p className="text-blue-900 font-medium text-sm">You have filled <strong>80%</strong> of your needs.</p>
         </div>
      </div>

      <button 
        onClick={onClose}
        className="px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg"
      >
        Done <ArrowRight size={18} />
      </button>
    </div>
  );
};
