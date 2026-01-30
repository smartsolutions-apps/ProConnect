
import React from 'react';
import { CheckCircle2, Coins } from 'lucide-react';

interface StepSuccessProps {
  onComplete: () => void;
}

export const StepSuccess: React.FC<StepSuccessProps> = ({ onComplete }) => {
  return (
    <div className="text-center py-12 animate-in zoom-in-95">
        <div className="relative inline-block mb-8">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={48} />
            </div>
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-yellow-200 flex items-center gap-1 animate-bounce">
                <Coins size={12} /> +50
            </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-2">You're All Set!</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Your profile is live and searchable by top recruiters at Vodafone, CIB, and more.
        </p>

        <div className="bg-gray-50 rounded-xl p-4 max-w-sm mx-auto mb-8 border border-gray-100 text-left">
            <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Your Wallet</h4>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                        <Coins size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-gray-900">50 Coins</p>
                        <p className="text-xs text-gray-500">Welcome Bonus</p>
                    </div>
                </div>
                <button className="text-xs font-bold text-brand-600 hover:underline">View Rewards</button>
            </div>
        </div>

        <button 
            onClick={onComplete}
            className="w-full max-w-sm py-4 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 shadow-xl shadow-brand-200 transition-all transform hover:-translate-y-1"
        >
            Launch ProConnect
        </button>
    </div>
  );
};
