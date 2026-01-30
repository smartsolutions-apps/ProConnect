
import React, { useState } from 'react';
import { Calendar, MapPin, QrCode, CheckCircle2, RefreshCw, MessageCircle, Map, UserX, AlertCircle, Clock, Sparkles } from 'lucide-react';
import { EVENTS, CURRENT_USER } from '../../data';
import { EventChatRoom } from '../chat/EventChatRoom';
import { ZoneManager } from '../zones/ZoneManager';
import { PanicReplacementModal } from './PanicReplacementModal';
import { BulkReviewAI } from '../reviews/BulkReviewAI';

export const ShiftManager: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState(EVENTS[0].id);
  const selectedEvent = EVENTS.find(e => e.id === selectedEventId) || EVENTS[0];
  const [activeCheckIns, setActiveCheckIns] = useState<number>(12);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'qr' | 'zones'>('qr');
  
  // Panic Mode State
  const [panicModalOpen, setPanicModalOpen] = useState(false);
  const [selectedAbsentee, setSelectedAbsentee] = useState<{name: string, role: string} | null>(null);

  // Review Mode State
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  // Simulated live updates
  const handleRefresh = () => {
    setActiveCheckIns(prev => prev + Math.floor(Math.random() * 3));
  };

  const handleReportNoShow = (name: string, role: string) => {
    setSelectedAbsentee({ name, role });
    setPanicModalOpen(true);
  };

  const handleBroadcastSOS = () => {
    setPanicModalOpen(false);
    alert(`SOS Broadcast Sent! Alerting standby pool for ${selectedAbsentee?.name}'s replacement.`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Shift Command Center</h2>
            <p className="text-gray-400">Manage check-ins, zone assignments, and live communication.</p>
          </div>
          <div className="flex gap-4">
             <button 
                onClick={() => setIsChatOpen(true)}
                className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-lg"
             >
                <MessageCircle size={18} /> Open Command Chat
             </button>
             <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl px-4 py-2 border border-white/20">
                <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                    <p className="text-2xl font-bold leading-none">{activeCheckIns}</p>
                    <p className="text-[10px] text-gray-300 uppercase font-bold tracking-wider">Checked In</p>
                </div>
             </div>
          </div>
        </div>
        
        {/* Sub-Navigation */}
        <div className="relative z-10 flex gap-4 mt-8 border-t border-white/10 pt-4 items-center">
            <button 
                onClick={() => setViewMode('qr')}
                className={`flex items-center gap-2 text-sm font-bold pb-2 border-b-2 transition-colors ${viewMode === 'qr' ? 'border-brand-500 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
                <QrCode size={16} /> Check-In & QR
            </button>
            <button 
                onClick={() => setViewMode('zones')}
                className={`flex items-center gap-2 text-sm font-bold pb-2 border-b-2 transition-colors ${viewMode === 'zones' ? 'border-brand-500 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
                <Map size={16} /> Zone Map
            </button>
            
            {/* NEW: End Shift & Review Button */}
            <div className="ml-auto pl-4 border-l border-white/20">
                <button 
                    onClick={() => setReviewModalOpen(true)}
                    className="flex items-center gap-2 text-xs font-bold text-yellow-300 hover:text-yellow-200 transition-colors animate-pulse"
                >
                    <Sparkles size={14} /> End Event & Review
                </button>
            </div>
        </div>
      </div>

      {viewMode === 'zones' ? (
          <ZoneManager />
      ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LEFT: Event Selector */}
                <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4 h-fit">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar size={18} className="text-brand-600"/> Active Events
                </h3>
                <div className="space-y-3">
                    {EVENTS.slice(0, 4).map(event => (
                    <button
                        key={event.id}
                        onClick={() => setSelectedEventId(event.id)}
                        className={`w-full text-left p-3 rounded-xl border transition-all ${
                        selectedEventId === event.id 
                            ? 'bg-brand-50 border-brand-500 ring-1 ring-brand-500' 
                            : 'bg-white border-gray-100 hover:border-brand-200 hover:bg-gray-50'
                        }`}
                    >
                        <p className={`text-sm font-bold ${selectedEventId === event.id ? 'text-brand-900' : 'text-gray-900'}`}>{event.name}</p>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <MapPin size={10} /> {event.venue.split('(')[0]}
                        </p>
                    </button>
                    ))}
                </div>
                </div>

                {/* CENTER: QR Generator */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center text-center">
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900">{selectedEvent.name}</h3>
                        <p className="text-gray-500 text-sm">{selectedEvent.date} • Shift A (Morning)</p>
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow-xl border-4 border-gray-900 mb-6 relative group">
                        {/* Simulated QR Code using CSS/SVG pattern to avoid external deps */}
                        <svg width="250" height="250" viewBox="0 0 100 100" className="text-gray-900 fill-current">
                        <rect x="0" y="0" width="100" height="100" fill="white" />
                        {/* Corner Markers */}
                        <rect x="10" y="10" width="20" height="20" rx="2" strokeWidth="4" stroke="currentColor" fill="none" />
                        <rect x="16" y="16" width="8" height="8" fill="currentColor" />
                        <rect x="70" y="10" width="20" height="20" rx="2" strokeWidth="4" stroke="currentColor" fill="none" />
                        <rect x="76" y="16" width="8" height="8" fill="currentColor" />
                        <rect x="10" y="70" width="20" height="20" rx="2" strokeWidth="4" stroke="currentColor" fill="none" />
                        <rect x="16" y="76" width="8" height="8" fill="currentColor" />
                        
                        {/* Random Data Pattern */}
                        <path d="M40 10 h10 v10 h-10 z M60 10 h5 v5 h-5 z M45 30 h15 v5 h-15 z M40 45 h10 v10 h-10 z M10 40 h15 v5 h-15 z M70 40 h10 v10 h-10 z M55 55 h15 v15 h-15 z M30 70 h20 v5 h-20 z M80 70 h10 v10 h-10 z M70 85 h20 v5 h-20 z" />
                        <path d="M20 50 h5 v5 h-5 z M50 20 h5 v5 h-5 z M80 50 h5 v5 h-5 z M50 80 h5 v5 h-5 z" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm">
                            <p className="font-bold text-gray-900">Scan to Check In</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button className="px-6 py-2 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                            <QrCode size={18} /> Print QR
                        </button>
                        <button 
                            onClick={handleRefresh}
                            className="px-6 py-2 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 transition-colors flex items-center gap-2"
                        >
                            <RefreshCw size={18} /> Refresh Code
                        </button>
                    </div>
                    
                    <p className="text-xs text-red-500 mt-4 font-medium bg-red-50 px-3 py-1 rounded-full">
                    Security: Code rotates every 15 minutes to prevent remote check-ins.
                    </p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Checkins List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Recent Check-ins</h3>
                    <div className="space-y-3">
                        {[1,2,3,4].map((i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Promoter {i}</p>
                                    <p className="text-xs text-green-600 flex items-center gap-1">
                                        <CheckCircle2 size={10} /> Checked in 9:{10 + i} AM
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Missing / Pending Staff (Panic Trigger) */}
                <div className="bg-red-50 rounded-xl shadow-sm border border-red-100 p-6">
                    <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2">
                        <AlertCircle size={18}/> Missing / Not Checked In
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-100 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-bold">
                                    MH
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Mahmoud Hassan</p>
                                    <p className="text-xs text-red-500 flex items-center gap-1">
                                        <Clock size={10} /> Late (25 mins)
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleReportNoShow("Mahmoud Hassan", "Promoter")}
                                className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 flex items-center gap-1 transition-colors"
                            >
                                <UserX size={12} /> Report No-Show
                            </button>
                        </div>
                    </div>
                </div>
            </div>
          </>
      )}

      {isChatOpen && (
        <EventChatRoom 
            eventId={selectedEvent.id}
            eventName={selectedEvent.name}
            currentUser={CURRENT_USER}
            onClose={() => setIsChatOpen(false)}
            isAdmin={true} // Recruiter View
        />
      )}

      {/* Panic Modal */}
      <PanicReplacementModal 
        isOpen={panicModalOpen}
        onClose={() => setPanicModalOpen(false)}
        absentUser={selectedAbsentee}
        onBroadcast={handleBroadcastSOS}
      />

      {/* AI Review Modal */}
      <BulkReviewAI 
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
      />
    </div>
  );
};
