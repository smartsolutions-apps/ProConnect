
import React, { useState } from 'react';
import { Siren, Clock, MapPin, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

interface UrgentGigCardProps {
  onAccept: () => void;
}

export const UrgentGigCard: React.FC<UrgentGigCardProps> = ({ onAccept }) => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    setTimeout(() => {
        onAccept();
    }, 1500);
  };

  if (accepted) {
    return (
        <div className="bg-green-600 rounded-xl p-6 text-white shadow-lg animate-in zoom-in mb-6 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-green-600 mb-4 shadow-md">
                <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-bold">Gig Secured!</h3>
            <p className="text-green-100 mb-4">Redirecting you to the Check-in QR...</p>
        </div>
    );
  }

  return (
    <div className="relative bg-white rounded-xl shadow-lg border-2 border-red-500 p-5 mb-6 overflow-hidden animate-in slide-in-from-top-4">
      {/* Pulsing Overlay */}
      <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex gap-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-xl h-fit">
                <Siren size={32} className="animate-bounce" />
            </div>
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded animate-pulse">URGENT</span>
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">No-Show Replacement</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Promoter @ Cairo ICT (Hall 1)</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1"><MapPin size={14}/> EIEC, New Cairo</span>
                    <span className="flex items-center gap-1"><Clock size={14}/> Start: IMMEDIATELY</span>
                </div>
            </div>
        </div>

        <div className="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between gap-4">
            <div className="text-right">
                <p className="text-xs text-gray-500 font-medium line-through">Standard: 500 EGP</p>
                <p className="text-xl font-bold text-green-600 flex items-center gap-1">
                    <Zap size={18} className="fill-green-600" /> 750 EGP
                </p>
                <p className="text-[10px] text-green-700 font-bold bg-green-100 px-2 py-0.5 rounded-full w-fit ml-auto">
                    +50% Surge Rate
                </p>
            </div>
            
            <button 
                onClick={handleAccept}
                className="px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-200 hover:bg-red-700 hover:scale-105 transition-all flex items-center gap-2"
            >
                ACCEPT NOW <ArrowRight size={18} />
            </button>
        </div>
      </div>
    </div>
  );
};
