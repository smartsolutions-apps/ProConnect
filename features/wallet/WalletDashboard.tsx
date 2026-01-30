
import React, { useState } from 'react';
import { Wallet, Smartphone, Zap, Store, Landmark, ArrowRight, Loader2, CheckCircle2, AlertTriangle, Package } from 'lucide-react';
import { User } from '../../types';
import { TransactionHistory } from './TransactionHistory';
import { ASSETS } from '../../data/assets';
import { useDemo } from '../../context/DemoContext';
import { EarningsForecastWidget } from './EarningsForecastWidget'; // New Import

interface WalletDashboardProps {
  wallet: User['wallet'];
}

export const WalletDashboard: React.FC<WalletDashboardProps> = ({ wallet }) => {
  const { isDemoMode, demoValues } = useDemo();
  const [isCashOutOpen, setIsCashOutOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // --- DEMO OVERRIDE LOGIC ---
  const currentBalance = isDemoMode ? demoValues.walletBalance : (wallet?.balance || 0);
  const currentPending = isDemoMode ? demoValues.pendingBalance : (wallet?.pending || 0);

  if (!wallet && !isDemoMode) return null;

  // --- ASSET CHECK LOGIC ---
  const myHeldAssets = ASSETS.filter(a => a.assignedTo === 'u_me' && a.status === 'ASSIGNED');
  const isPayoutLocked = myHeldAssets.length > 0;

  const handleCashOut = () => {
    setProcessing(true);
    setTimeout(() => {
        setProcessing(false);
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            setIsCashOutOpen(false);
            setSelectedMethod(null);
        }, 2000);
    }, 1500);
  };

  const PAYMENT_METHODS = [
    { id: 'vodafone', label: 'Vodafone Cash', icon: Smartphone, color: 'text-red-600', bg: 'bg-red-50' },
    { id: 'instapay', label: 'InstaPay', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'fawry', label: 'Fawry', icon: Store, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { id: 'bank', label: 'Bank Transfer', icon: Landmark, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-top-4">
      
      {/* PAYOUT LOCK WARNING */}
      {isPayoutLocked && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl shadow-sm flex items-start gap-3">
              <div className="p-2 bg-amber-100 rounded-full text-amber-600 flex-shrink-0">
                  <AlertTriangle size={20} />
              </div>
              <div className="flex-1">
                  <h3 className="font-bold text-amber-800">Payout Locked: Return Assets</h3>
                  <p className="text-sm text-amber-700 mt-1">
                      You are currently holding <strong>{myHeldAssets.length} items</strong> (e.g., {myHeldAssets[0].name}). 
                      Please return them to the supervisor to unlock your withdrawal.
                  </p>
                  <div className="mt-3 flex gap-2">
                      {myHeldAssets.map(asset => (
                          <span key={asset.id} className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-amber-200 rounded text-xs font-medium text-amber-800">
                              <Package size={10} /> {asset.name}
                          </span>
                      ))}
                  </div>
              </div>
          </div>
      )}

      {/* Wallet Card */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
         
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                    <Wallet size={14} /> Available Balance
                </p>
                <h2 className="text-4xl font-bold mb-1">
                    <span className="text-2xl opacity-70">EGP</span> {currentBalance.toLocaleString()}
                </h2>
                {currentPending > 0 && (
                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/10 mt-2">
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-gray-300">
                            EGP {currentPending.toLocaleString()} pending clearance
                        </span>
                    </div>
                )}
            </div>

            <button 
                onClick={() => setIsCashOutOpen(true)}
                disabled={isPayoutLocked}
                className={`font-bold px-6 py-3 rounded-xl transition-all shadow-lg flex items-center gap-2 active:scale-95 ${
                    isPayoutLocked 
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50' 
                        : 'bg-green-500 hover:bg-green-400 text-gray-900 shadow-green-900/20'
                }`}
                title={isPayoutLocked ? "Return assets to withdraw" : "Cash Out"}
            >
                {isPayoutLocked ? <><AlertTriangle size={18}/> Locked</> : <><ArrowRight size={18} /> Cash Out Now</>}
            </button>
         </div>
      </div>

      {/* --- NEW: EARNINGS FORECAST --- */}
      <EarningsForecastWidget />

      {/* History */}
      <TransactionHistory transactions={wallet?.history || []} />

      {/* Cash Out Modal */}
      {isCashOutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
                {success ? (
                    <div className="p-8 text-center">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                            <CheckCircle2 size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Withdrawal Initiated</h3>
                        <p className="text-gray-500">Your funds are on the way to your {selectedMethod === 'vodafone' ? 'wallet' : 'account'}.</p>
                    </div>
                ) : (
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Select Withdrawal Method</h3>
                        
                        <div className="space-y-3 mb-8">
                            {PAYMENT_METHODS.map((method) => {
                                const isSelected = selectedMethod === method.id;
                                const Icon = method.icon;
                                return (
                                    <button
                                        key={method.id}
                                        onClick={() => setSelectedMethod(method.id)}
                                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                                            isSelected 
                                                ? 'border-green-500 bg-green-50 ring-1 ring-green-500' 
                                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className={`p-3 rounded-full ${method.bg} ${method.color}`}>
                                            <Icon size={20} />
                                        </div>
                                        <div className="text-left flex-1">
                                            <p className="font-bold text-gray-900">{method.label}</p>
                                            <p className="text-xs text-gray-500">Instant Transfer</p>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
                                            {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex gap-3">
                            <button 
                                onClick={() => setIsCashOutOpen(false)}
                                className="flex-1 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleCashOut}
                                disabled={!selectedMethod || processing}
                                className="flex-1 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                {processing ? <Loader2 size={18} className="animate-spin" /> : 'Confirm Withdrawal'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
};
