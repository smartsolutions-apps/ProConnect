
import React from 'react';
import { MapPin, User as UserIcon } from 'lucide-react';
import { Zone } from '../../types';

interface VenueMapProps {
  zones: Zone[];
  onZoneClick?: (zoneId: string) => void;
  selectedZoneId?: string | null;
}

export const VenueMap: React.FC<VenueMapProps> = ({ zones, onZoneClick, selectedZoneId }) => {
  return (
    <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-inner group">
      
      {/* Floor Plan Simulation */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      {/* Structural Elements (Walls/Booths) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border-4 border-gray-300 rounded-lg pointer-events-none opacity-50">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-white"></div> {/* Door */}
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-white"></div> {/* Door */}
         <div className="absolute top-1/4 left-10 w-24 h-24 border-2 border-gray-300 bg-gray-200/50 flex items-center justify-center text-xs font-bold text-gray-400">Booth A</div>
         <div className="absolute bottom-1/4 left-10 w-24 h-24 border-2 border-gray-300 bg-gray-200/50 flex items-center justify-center text-xs font-bold text-gray-400">Booth B</div>
         <div className="absolute right-10 top-10 w-32 h-48 border-2 border-gray-300 bg-gray-200/50 flex items-center justify-center text-xs font-bold text-gray-400">Stage Area</div>
      </div>

      <div className="absolute top-4 left-4 bg-white/80 backdrop-blur px-3 py-1 rounded-md text-xs font-bold text-gray-500 pointer-events-none">
        Cairo ICT - Hall 1
      </div>

      {/* Pins */}
      {zones.map((zone) => {
        const isFull = zone.assignedUsers.length >= zone.capacity;
        const isEmpty = zone.assignedUsers.length === 0;
        const isSelected = selectedZoneId === zone.id;

        let pinColor = 'text-amber-500 fill-amber-500'; // Partial
        if (isFull) pinColor = 'text-green-600 fill-green-600';
        if (isEmpty) pinColor = 'text-red-500 fill-red-500';

        return (
          <div
            key={zone.id}
            onClick={() => onZoneClick && onZoneClick(zone.id)}
            className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-full transition-all duration-300 hover:scale-110 hover:z-20 z-10`}
            style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
          >
            <div className="relative group/pin">
               {/* Selection Indicator */}
               {isSelected && (
                   <div className="absolute -inset-3 bg-brand-500/30 rounded-full animate-ping"></div>
               )}
               
               <MapPin 
                  size={32} 
                  className={`drop-shadow-lg ${pinColor} stroke-white stroke-2`} 
               />
               
               {/* Capacity Badge */}
               <div className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm border border-white">
                  {zone.assignedUsers.length}/{zone.capacity}
               </div>

               {/* Hover Tooltip */}
               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 p-3 opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none z-50">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{zone.name}</h4>
                  <div className="h-px bg-gray-100 mb-2"></div>
                  
                  {zone.assignedUsers.length > 0 ? (
                      <div className="space-y-1">
                          {zone.assignedUsers.map((u, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                                  <div className="w-4 h-4 rounded-full bg-gray-200 overflow-hidden">
                                      <img src={u.avatarUrl} className="w-full h-full object-cover" />
                                  </div>
                                  <span className="truncate">{u.name}</span>
                              </div>
                          ))}
                      </div>
                  ) : (
                      <p className="text-xs text-red-500 italic">No staff assigned</p>
                  )}
                  
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white rotate-45 border-b border-r border-gray-100"></div>
               </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
