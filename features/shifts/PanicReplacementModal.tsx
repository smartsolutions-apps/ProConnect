
import React, { useState } from 'react';
import { AlertTriangle, UserX, Users, Zap, ArrowRight, Loader2, Siren } from 'lucide-react';
import { User } from '../../types';
import { STANDBY_POOL } from '../../data/zones';

interface PanicReplacementModalProps {
  isOpen: boolean;
  onClose: () => void;
  absentUser: { name: string; role: string } | null;
  onBroadcast: () => void;
}

export const PanicReplacementModal: React.FC<PanicReplacementModalProps> = ({ isOpen, onClose, absentUser, onBroadcast }) => {
  const [strategy, setStrategy] = useState<'broadcast' | 'manual'>('broadcast');
  const [isLaunching, setIsLaunching] = useState(false);

  if (!isOpen || !absentUser) return null;

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => {
        setIsLaunching(false);
        onBroadcast();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-red-900/40 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border-2 border-red-500 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-red-600 p-6 text-white flex justify-between items-start">
            <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Siren className="animate-pulse" /> Emergency Replacement
                </h2>
                <p className="text-red-100 text-sm mt-1">
                    Reporting <strong>{absentUser.name}</strong> as No-Show.
                </p>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-red-700 rounded-full transition-colors"><UserX size={24}/></button>
        </div>

        <div className="p-6">
            <h3 className="font-bold text-gray-900 mb-4">Select Replacement Strategy:</h3>
            
            <div className="space-y-3 mb-6">
                {/* Option A: Broadcast */}
                <div 
                    onClick={() => setStrategy('broadcast')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${strategy === 'broadcast' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2 font-bold text-gray-900">
                            <Zap size={18} className="text-amber-500 fill-amber-500" />
                            Surge Broadcast (Recommended)
                        </div>
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Fastest</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                        Instantly notify <strong>{STANDBY_POOL.length} qualified candidates</strong> in the standby pool.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-red-600 bg-red-100 px-3 py-1.5 rounded-lg w-fit">
                        <AlertTriangle size={12} /> Surge Rate Applied: EGP 750 (1.5x)
                    </div>
                </div>

                {/* Option B: Manual */}
                <div 
                    onClick={() => setStrategy('manual')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${strategy === 'manual' ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                    <div className="flex items-center gap-2 font-bold text-gray-900 mb-2">
                        <Users size={18} className="text-blue-500" />
                        Manual Assignment
                    </div>
                    <p className="text-sm text-gray-600">
                        Manually select a specific user from your contacts. Slower response time.
                    </p>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <button 
                    onClick={onClose}
                    className="px-6 py-3 text-gray-500 font-bold hover:text-gray-700"
                >
                    Cancel
                </button>
                <button 
                    onClick={handleLaunch}
                    disabled={isLaunching}
                    className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition-all flex items-center gap-2"
                >
                    {isLaunching ? (
                        <><Loader2 size={18} className="animate-spin" /> Broadcasting SOS...</>
                    ) : (
                        <><AlertTriangle size={18} /> LAUNCH SOS CALL</>
                    )}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
