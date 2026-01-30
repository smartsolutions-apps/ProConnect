
import React, { useState, useMemo } from 'react';
import { X, Calendar, Clock, Video, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { User } from '../../types';

interface BookInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: User;
}

export const BookInterviewModal: React.FC<BookInterviewModalProps> = ({ isOpen, onClose, candidate }) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS'>('IDLE');

  // Generate Slots based on User Availability
  const slots = useMemo(() => {
    if (!candidate.interviewAvailability) return [];
    
    const { days, startHour, endHour } = candidate.interviewAvailability;
    const generatedSlots = [];
    const today = new Date();
    
    // Generate next 14 days
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      if (days.includes(dayName)) {
        for (let h = startHour; h < endHour; h++) {
            // Format time 12h
            const timeStr = new Date(date.setHours(h, 0, 0)).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            
            generatedSlots.push({
                id: `${date.toISOString()}-${h}`,
                dateObj: new Date(date), // clone
                dayName,
                dateStr: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                timeStr
            });
        }
      }
    }
    return generatedSlots.slice(0, 9); // Show first 9 slots
  }, [candidate]);

  const handleBook = () => {
    setStatus('SENDING');
    setTimeout(() => {
        setStatus('SUCCESS');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
            <div>
                <h3 className="font-bold text-gray-900">Book Interview</h3>
                <p className="text-xs text-gray-500">Instant booking, no back-and-forth.</p>
            </div>
            <button onClick={onClose} className="hover:bg-gray-200 p-1 rounded-full text-gray-500 transition-colors">
                <X size={20} />
            </button>
        </div>

        <div className="p-6">
            {status === 'SUCCESS' ? (
                <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in">
                        <CheckCircle2 size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Invitation Sent!</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        A Google Meet link has been sent to <strong>{candidate.name}</strong> for:
                    </p>
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 inline-block mb-6">
                        <span className="font-bold text-blue-800 text-sm">
                            {slots.find(s => s.id === selectedSlot)?.dateStr} • {slots.find(s => s.id === selectedSlot)?.timeStr}
                        </span>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        Close Window
                    </button>
                </div>
            ) : (
                <>
                    <div className="mb-6">
                         <div className="flex items-center gap-2 mb-4">
                            <img src={candidate.avatarUrl} className="w-8 h-8 rounded-full border border-gray-100" />
                            <div>
                                <p className="text-sm font-bold text-gray-900">{candidate.name}'s Availability</p>
                                <p className="text-xs text-green-600 flex items-center gap-1">
                                    <CheckCircle2 size={10} /> Pre-approved slots
                                </p>
                            </div>
                         </div>
                         
                         <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                            {slots.map((slot) => (
                                <button
                                    key={slot.id}
                                    onClick={() => setSelectedSlot(slot.id)}
                                    className={`p-2 rounded-lg border text-center transition-all ${
                                        selectedSlot === slot.id 
                                            ? 'bg-brand-600 border-brand-600 text-white shadow-md transform scale-105' 
                                            : 'bg-white border-gray-200 text-gray-700 hover:border-brand-300 hover:bg-brand-50'
                                    }`}
                                >
                                    <p className="text-[10px] font-bold uppercase opacity-80 mb-0.5">{slot.dayName}</p>
                                    <p className="text-xs font-bold mb-0.5">{slot.dateStr.split(' ')[1]}</p>
                                    <p className={`text-[10px] py-0.5 rounded px-1 ${selectedSlot === slot.id ? 'bg-white/20' : 'bg-gray-100'}`}>
                                        {slot.timeStr}
                                    </p>
                                </button>
                            ))}
                         </div>
                         {slots.length === 0 && (
                             <p className="text-center text-sm text-gray-500 py-4">No available slots in the next 14 days.</p>
                         )}
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3 mb-6">
                        <div className="p-2 bg-white border border-gray-100 rounded shadow-sm">
                            <Video size={20} className="text-blue-500" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-900">Google Meet</p>
                            <p className="text-[10px] text-gray-500">Video link auto-generated</p>
                        </div>
                    </div>

                    <button 
                        onClick={handleBook}
                        disabled={!selectedSlot || status === 'SENDING'}
                        className="w-full py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-200"
                    >
                        {status === 'SENDING' ? (
                            <><Loader2 size={18} className="animate-spin" /> Sending Invite...</>
                        ) : (
                            <><Calendar size={18} /> Schedule Interview</>
                        )}
                    </button>
                </>
            )}
        </div>
      </div>
    </div>
  );
};
