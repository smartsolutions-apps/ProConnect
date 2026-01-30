
import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Loader2, Smartphone, Building2, QrCode, Copy, ShieldCheck } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
  title: string;
}

type PaymentMethod = 'INSTAPAY' | 'VODAFONE' | 'FAWRY';

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess, amount, title }) => {
  const [method, setMethod] = useState<PaymentMethod | null>(null);
  const [step, setStep] = useState<'SELECT' | 'PROCESS' | 'SUCCESS'>('SELECT');
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    let timer: any;
    if (step === 'PROCESS' && method !== 'FAWRY') {
      // Simulate QR Scan / Processing time
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setStep('SUCCESS');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, method]);

  const handleMethodSelect = (m: PaymentMethod) => {
    setMethod(m);
    setStep('PROCESS');
    setCountdown(3);
  };

  const handleClose = () => {
    if (step === 'SUCCESS') {
      onSuccess();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-100 p-6 flex justify-between items-start">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Secure Checkout</h3>
            <p className="text-sm text-gray-500">{title}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          
          {/* Amount Display */}
          <div className="mb-8 text-center">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Amount</p>
            <h2 className="text-4xl font-black text-gray-900 flex justify-center items-start gap-1">
              <span className="text-lg font-bold text-gray-400 mt-1">EGP</span>
              {amount.toLocaleString()}
            </h2>
          </div>

          {step === 'SELECT' && (
            <div className="space-y-3">
              <button 
                onClick={() => handleMethodSelect('INSTAPAY')}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-purple-100 bg-purple-50 hover:bg-purple-100 hover:border-purple-300 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
                    <QrCode size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">InstaPay</p>
                    <p className="text-xs text-purple-700">Instant transfer via QR</p>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full border-2 border-purple-300 group-hover:border-purple-600"></div>
              </button>

              <button 
                onClick={() => handleMethodSelect('VODAFONE')}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-red-100 bg-red-50 hover:bg-red-100 hover:border-red-300 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
                    <Smartphone size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Vodafone Cash</p>
                    <p className="text-xs text-red-700">Mobile wallet payment</p>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full border-2 border-red-300 group-hover:border-red-600"></div>
              </button>

              <button 
                onClick={() => handleMethodSelect('FAWRY')}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-yellow-100 bg-yellow-50 hover:bg-yellow-100 hover:border-yellow-300 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
                    <Building2 size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Fawry Pay</p>
                    <p className="text-xs text-yellow-700">Pay at any kiosk</p>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full border-2 border-yellow-300 group-hover:border-yellow-600"></div>
              </button>
            </div>
          )}

          {step === 'PROCESS' && method !== 'FAWRY' && (
            <div className="text-center py-4">
               {method === 'INSTAPAY' ? (
                 <div className="mb-6 relative inline-block p-4 bg-white rounded-2xl shadow-lg border-2 border-purple-100">
                    {/* Simulated QR Pattern */}
                    <div className="w-48 h-48 bg-gray-900 pattern-grid-lg opacity-90 rounded-lg flex items-center justify-center">
                        <QrCode size={64} className="text-white" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-1 bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)] animate-[scan_1.5s_infinite_linear]"></div>
                    </div>
                 </div>
               ) : (
                 <div className="mb-6 w-24 h-24 mx-auto rounded-full border-4 border-red-100 border-t-red-600 animate-spin"></div>
               )}
               
               <h3 className="text-xl font-bold text-gray-900 mb-2">
                 {method === 'INSTAPAY' ? 'Scan with InstaPay' : 'Requesting Payment...'}
               </h3>
               <p className="text-gray-500 text-sm">
                 Waiting for confirmation...
               </p>
            </div>
          )}

          {step === 'PROCESS' && method === 'FAWRY' && (
             <div className="text-center py-4">
                <p className="text-sm text-gray-500 mb-4">Pay at any Fawry kiosk with this code:</p>
                <div className="bg-gray-100 p-6 rounded-2xl mb-6 flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                    <span className="text-4xl font-mono font-black text-gray-900 tracking-widest">922 401 88</span>
                    <button className="mt-4 flex items-center gap-2 text-sm text-brand-600 font-bold hover:underline">
                        <Copy size={14} /> Copy Reference
                    </button>
                </div>
                <p className="text-xs text-yellow-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    Code expires in 24 hours. Transaction will complete automatically upon payment.
                </p>
                <button 
                    onClick={handleClose}
                    className="mt-6 w-full py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors"
                >
                    Close & Wait
                </button>
             </div>
          )}

          {step === 'SUCCESS' && (
            <div className="text-center py-6">
               <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-in zoom-in">
                  <CheckCircle2 size={48} />
               </div>
               <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Verified!</h3>
               <p className="text-gray-500 mb-8">
                 Transaction ID: #TXN-{Math.floor(Math.random() * 100000)}
               </p>
               <button 
                 onClick={handleClose}
                 className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg transform hover:-translate-y-1"
               >
                 Continue
               </button>
            </div>
          )}

        </div>

        {/* Secure Footer */}
        {step !== 'SUCCESS' && (
            <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
                <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                    <ShieldCheck size={12} /> Powered by Paymob • 256-bit SSL Encrypted
                </p>
            </div>
        )}
      </div>
    </div>
  );
};
