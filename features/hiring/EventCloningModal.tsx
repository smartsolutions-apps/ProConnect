
import React, { useState } from 'react';
import { X, Users, Star, ArrowRight, Copy, Filter, Calendar } from 'lucide-react';
import { EVENTS } from '../../data';
import { OfferSentSuccess } from './OfferSentSuccess';

interface EventCloningModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceEventName: string;
}

export const EventCloningModal: React.FC<EventCloningModalProps> = ({ isOpen, onClose, sourceEventName }) => {
  const [step, setStep] = useState<'CONFIGURE' | 'SUCCESS'>('CONFIGURE');
  const [targetEventId, setTargetEventId] = useState<string>(EVENTS[1].id); // Default to 2nd event
  const [filters, setFilters] = useState({
    topPerformers: true, // 5 Stars
    goodStaff: true, // 4 Stars
    excludeNoShows: true
  });

  if (!isOpen) return null;

  // Mock Calculation
  const countTop = 12;
  const countGood = 28;
  const totalCount = (filters.topPerformers ? countTop : 0) + (filters.goodStaff ? countGood : 0);

  const handleSendOffers = () => {
    setStep('SUCCESS');
  };

  const selectedTargetEvent = EVENTS.find(e => e.id === targetEventId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95">
        
        {step === 'SUCCESS' ? (
            <OfferSentSuccess 
                count={totalCount} 
                eventName={selectedTargetEvent?.name || 'Upcoming Event'} 
                onClose={onClose} 
            />
        ) : (
            <>
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Copy size={20} className="text-purple-200" /> Smart Re-Hire
                        </h2>
                        <p className="text-purple-100 text-sm mt-1">Don't search. Just clone your best team.</p>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors"><X size={20}/></button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Source & Target */}
                    <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-gray-500 uppercase">From (Past Event)</span>
                            <span className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                {sourceEventName} <span className="bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-full">Ended</span>
                            </span>
                        </div>
                        <div className="h-px bg-gray-200 w-full"></div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-gray-500 uppercase">To (Target)</span>
                            <select 
                                value={targetEventId}
                                onChange={(e) => setTargetEventId(e.target.value)}
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-1.5 font-bold"
                            >
                                {EVENTS.filter(e => e.id !== 'evt_cairo_ict').map(e => (
                                    <option key={e.id} value={e.id}>{e.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Filters */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Filter size={16} /> Who to invite?
                        </h3>
                        <div className="space-y-3">
                            <label className="flex items-center justify-between p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <input 
                                        type="checkbox" 
                                        checked={filters.topPerformers}
                                        onChange={(e) => setFilters({...filters, topPerformers: e.target.checked})}
                                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                                    />
                                    <div>
                                        <p className="font-bold text-gray-900 flex items-center gap-1">
                                            Top Performers <Star size={12} className="fill-yellow-400 text-yellow-400"/> (5.0)
                                        </p>
                                        <p className="text-xs text-gray-500">Highly recommended staff.</p>
                                    </div>
                                </div>
                                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">{countTop} Users</span>
                            </label>

                            <label className="flex items-center justify-between p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <input 
                                        type="checkbox" 
                                        checked={filters.goodStaff}
                                        onChange={(e) => setFilters({...filters, goodStaff: e.target.checked})}
                                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                                    />
                                    <div>
                                        <p className="font-bold text-gray-900">Reliable Staff (4.0+)</p>
                                        <p className="text-xs text-gray-500">Good attendance and performance.</p>
                                    </div>
                                </div>
                                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">{countGood} Users</span>
                            </label>

                            <label className="flex items-center gap-3 p-3 bg-red-50 border border-red-100 rounded-xl opacity-75 cursor-not-allowed">
                                <input type="checkbox" checked disabled className="w-5 h-5 text-red-600 rounded bg-gray-100 border-gray-300" />
                                <span className="text-sm font-bold text-red-700">Exclude "No-Shows" (Auto-Applied)</span>
                            </label>
                        </div>
                    </div>

                    {/* Action */}
                    <button 
                        onClick={handleSendOffers}
                        className="w-full py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 shadow-lg shadow-purple-200 transition-all flex items-center justify-center gap-2 transform active:scale-95"
                    >
                        Send {totalCount} Direct Offers <ArrowRight size={20} />
                    </button>
                </div>
            </>
        )}
      </div>
    </div>
  );
};
