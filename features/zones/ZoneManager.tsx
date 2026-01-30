
import React, { useState } from 'react';
import { VenueMap } from './VenueMap';
import { INITIAL_ZONES, STANDBY_STAFF } from '../../data';
import { User, Zone } from '../../types';
import { Users, AlertCircle, ArrowRight, X, Map } from 'lucide-react';

export const ZoneManager: React.FC = () => {
  const [zones, setZones] = useState<Zone[]>(INITIAL_ZONES);
  const [standby, setStandby] = useState<User[]>(STANDBY_STAFF);
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);

  const selectedZone = zones.find(z => z.id === selectedZoneId);

  const handleAssign = (user: User) => {
    if (!selectedZoneId) {
        alert("Please select a zone on the map first.");
        return;
    }

    const zoneIndex = zones.findIndex(z => z.id === selectedZoneId);
    const targetZone = zones[zoneIndex];

    if (targetZone.assignedUsers.length >= targetZone.capacity) {
        alert("Zone is full!");
        return;
    }

    // Move from Standby to Zone
    const newZones = [...zones];
    newZones[zoneIndex] = {
        ...targetZone,
        assignedUsers: [...targetZone.assignedUsers, user]
    };
    setZones(newZones);
    setStandby(prev => prev.filter(u => u.id !== user.id));
  };

  const handleUnassign = (user: User, zoneId: string) => {
    // Move from Zone to Standby
    const zoneIndex = zones.findIndex(z => z.id === zoneId);
    const targetZone = zones[zoneIndex];

    const newZones = [...zones];
    newZones[zoneIndex] = {
        ...targetZone,
        assignedUsers: targetZone.assignedUsers.filter(u => u.id !== user.id)
    };
    setZones(newZones);
    setStandby(prev => [...prev, user]);
  };

  // Calculate Stats
  const totalSlots = zones.reduce((acc, z) => acc + z.capacity, 0);
  const filledSlots = zones.reduce((acc, z) => acc + z.assignedUsers.length, 0);
  const coverage = Math.round((filledSlots / totalSlots) * 100);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Map size={20} className="text-brand-600" /> Zone Assignment Console
            </h2>
            <p className="text-sm text-gray-500">Drag and drop staff functionality is simulated via click-to-assign.</p>
         </div>
         <div className="flex gap-4">
            <div className="bg-blue-50 px-4 py-2 rounded-lg text-center">
                <p className="text-xs font-bold text-blue-700 uppercase">Coverage</p>
                <p className="text-lg font-bold text-blue-900">{coverage}%</p>
            </div>
            <div className="bg-amber-50 px-4 py-2 rounded-lg text-center">
                <p className="text-xs font-bold text-amber-700 uppercase">Standby</p>
                <p className="text-lg font-bold text-amber-900">{standby.length}</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* LEFT: MAP */}
         <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="font-bold text-gray-900">Floor Plan</h3>
                {selectedZone ? (
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-brand-600">{selectedZone.name} Selected</span>
                        <button onClick={() => setSelectedZoneId(null)} className="text-gray-400 hover:text-gray-600"><X size={16}/></button>
                    </div>
                ) : (
                    <span className="text-xs text-gray-400 flex items-center gap-1"><AlertCircle size={12}/> Select a zone to assign staff</span>
                )}
            </div>
            
            <VenueMap 
                zones={zones} 
                onZoneClick={setSelectedZoneId} 
                selectedZoneId={selectedZoneId} 
            />

            {/* Selected Zone Details (Mini Editor) */}
            {selectedZone && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 animate-in slide-in-from-top-2">
                    <h4 className="font-bold text-gray-900 mb-3 flex justify-between">
                        Assigned Staff 
                        <span className="text-xs bg-white px-2 py-1 rounded border border-gray-200">{selectedZone.assignedUsers.length}/{selectedZone.capacity}</span>
                    </h4>
                    {selectedZone.assignedUsers.length === 0 ? (
                        <p className="text-xs text-gray-500 italic">No staff assigned yet. Select from the right.</p>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {selectedZone.assignedUsers.map(u => (
                                <div key={u.id} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                                    <img src={u.avatarUrl} className="w-5 h-5 rounded-full" />
                                    <span className="text-xs font-bold text-gray-700">{u.name}</span>
                                    <button 
                                        onClick={() => handleUnassign(u, selectedZone.id)}
                                        className="ml-1 text-gray-400 hover:text-red-500"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
         </div>

         {/* RIGHT: STANDBY LIST */}
         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 h-fit max-h-[600px] overflow-y-auto">
            <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                <Users size={18} className="text-gray-500" /> Unassigned Staff
            </h3>
            <p className="text-xs text-gray-500 mb-4">Click 'Assign' to move to selected zone.</p>

            <div className="space-y-2">
                {standby.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-brand-200 hover:bg-brand-50 transition-all group">
                        <div className="flex items-center gap-3">
                            <img src={user.avatarUrl} className="w-10 h-10 rounded-full bg-gray-200" />
                            <div>
                                <p className="text-sm font-bold text-gray-900">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.headline.split('|')[0]}</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleAssign(user)}
                            disabled={!selectedZoneId}
                            className={`p-2 rounded-lg transition-colors ${
                                selectedZoneId 
                                    ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm' 
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                            title={selectedZoneId ? `Assign to ${selectedZone?.name}` : "Select a zone first"}
                        >
                            <ArrowRight size={16} />
                        </button>
                    </div>
                ))}
                {standby.length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-sm">
                        All staff assigned!
                    </div>
                )}
            </div>
         </div>
      </div>
    </div>
  );
};
