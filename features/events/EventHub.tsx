
import React, { useState } from 'react';
import { Calendar, MapPin, Users, CheckCircle2, Zap, MessageCircle } from 'lucide-react';
import { EVENTS, CURRENT_USER } from '../../data';
import { Event } from '../../types';
import { EventChatRoom } from '../chat/EventChatRoom';
import { PageMeta } from '../../components/common/PageMeta';

export const EventHub: React.FC = () => {
  const [appliedEvents, setAppliedEvents] = useState<string[]>([]);
  const [chatEventId, setChatEventId] = useState<string | null>(null);

  const handleOneClickApply = (eventId: string) => {
    // Simulate API call
    if (appliedEvents.includes(eventId)) return;
    setAppliedEvents(prev => [...prev, eventId]);
  };

  const activeChatEvent = EVENTS.find(e => e.id === chatEventId);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <PageMeta 
        title="Event Pool & Expos" 
        description="Apply for shifts at major Egyptian events like Cairo ICT, Cityscape, and Sahara Expo. Join the unified talent pool."
      />

      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
         <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">The Unified Event Pool</h2>
            <p className="text-purple-200 max-w-xl text-lg">
                Apply once. Get hired by any of the 500+ companies attending.
                Skip the repetitive forms. Be seen by everyone at the expo.
            </p>
         </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
         <Calendar className="text-brand-600" /> Upcoming Exhibitions & Expos
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {EVENTS.map((event: Event) => {
             const isApplied = appliedEvents.includes(event.id);
             // Simulate "HIRED" status for the first event (Cairo ICT) for demo purposes
             const isHired = event.id === EVENTS[0].id; 
             
             return (
                 <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-48 overflow-hidden">
                        <img 
                            src={event.imageUrl} 
                            alt={event.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                            <h4 className="text-white font-bold text-xl leading-tight">{event.name}</h4>
                            <div className="flex items-center gap-2 text-white/80 text-xs mt-1">
                                <MapPin size={12} /> {event.venue}
                            </div>
                        </div>
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
                            {event.date.split(' - ')[0]}
                        </div>
                    </div>
                    
                    <div className="p-5">
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                            {event.roles.map(role => (
                                <span key={role} className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wide">
                                    {role}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                                <Users size={14} className="text-brand-600" />
                                {event.attendeeCount} Companies Hiring
                            </div>

                            {isHired ? (
                                <button 
                                    onClick={() => setChatEventId(event.id)}
                                    className="px-4 py-2 bg-gray-900 text-white font-bold rounded-xl flex items-center gap-2 text-xs hover:bg-gray-800 transition-colors shadow-md"
                                >
                                    <MessageCircle size={16} /> Open Team Chat
                                </button>
                            ) : isApplied ? (
                                <button disabled className="px-4 py-2 bg-green-50 text-green-700 font-bold rounded-xl flex items-center gap-2 text-xs border border-green-200">
                                    <CheckCircle2 size={16} /> Pool Joined
                                </button>
                            ) : (
                                <button 
                                    onClick={() => handleOneClickApply(event.id)}
                                    className="px-4 py-2 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-200 transition-all active:scale-95 flex items-center gap-2 text-xs"
                                >
                                    <Zap size={16} /> Apply as Promoter
                                </button>
                            )}
                        </div>
                    </div>
                 </div>
             );
         })}
      </div>

      {activeChatEvent && (
        <EventChatRoom 
            eventId={activeChatEvent.id} 
            eventName={activeChatEvent.name}
            currentUser={CURRENT_USER}
            onClose={() => setChatEventId(null)}
            isAdmin={false} // Seeker View
        />
      )}
    </div>
  );
};
