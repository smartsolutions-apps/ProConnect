
import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, MapPin, ShieldCheck, CheckCircle2, Loader2, Wallet } from 'lucide-react';

interface ShiftScannerProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const ShiftScanner: React.FC<ShiftScannerProps> = ({ onClose, onSuccess }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [scanResult, setScanResult] = useState<'success' | 'verifying' | null>(null);

  // 1. Initialize Camera
  useEffect(() => {
    let stream: MediaStream | null = null;
    
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment" } 
        });
        setPermissionGranted(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied:", err);
        setPermissionGranted(false);
      }
    };

    if (scanning) {
        startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [scanning]);

  // 2. Simulated Scan Logic (Clicking the camera area)
  const handleSimulateScan = () => {
    if (scanResult) return;
    
    setScanResult('verifying');
    
    setTimeout(() => {
        setScanResult('success');
        setTimeout(() => {
            onSuccess(); // Triggers parent refresh/close
        }, 2500); // Increased delay to show earnings
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-20 bg-gradient-to-b from-black/80 to-transparent">
         <div>
            <h2 className="text-white font-bold text-lg">Scan Shift QR</h2>
            <p className="text-white/70 text-xs">Find the Shift Supervisor to check in.</p>
         </div>
         <button onClick={onClose} className="p-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/30">
            <X size={20} />
         </button>
      </div>

      {/* Camera Viewport */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
         {!permissionGranted ? (
            <div className="text-center p-8">
               <Camera size={48} className="text-gray-500 mx-auto mb-4" />
               <p className="text-gray-400">Camera permission is required to scan.</p>
            </div>
         ) : (
            <>
                <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Scan Overlay (Scanner Box) */}
                <div className="absolute inset-0 flex items-center justify-center p-12">
                     <div className="relative w-64 h-64 border-2 border-white/50 rounded-3xl" onClick={handleSimulateScan}>
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-brand-500 rounded-tl-xl"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-brand-500 rounded-tr-xl"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-brand-500 rounded-bl-xl"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-brand-500 rounded-br-xl"></div>
                        
                        {/* Scan Line Animation */}
                        {scanResult === null && (
                            <div className="absolute top-0 left-0 right-0 h-1 bg-brand-500 shadow-[0_0_15px_rgba(14,165,233,0.8)] animate-[scan_2s_infinite_linear]"></div>
                        )}
                        
                        {/* Interactive Click Area for Demo */}
                        <div className="absolute inset-0 cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm rounded-2xl">
                             <p className="text-white font-bold">Tap to Simulate Scan</p>
                        </div>
                     </div>
                </div>

                {/* Location Verification Tag */}
                <div className="absolute bottom-32 left-0 right-0 flex justify-center">
                    <div className="bg-black/60 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
                        <MapPin size={14} className="text-green-400" />
                        <span className="text-xs text-white font-medium">Location Verified: Cairo Festival City</span>
                    </div>
                </div>
            </>
         )}
      </div>

      {/* Success/Processing Overlays */}
      {scanResult === 'verifying' && (
         <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 animate-in fade-in">
             <Loader2 size={48} className="text-brand-500 animate-spin mb-4" />
             <h3 className="text-xl font-bold text-white">Verifying Check-in...</h3>
             <p className="text-gray-400 mt-2">Checking GPS location and shift time.</p>
         </div>
      )}

      {scanResult === 'success' && (
         <div className="absolute inset-0 z-30 bg-green-600 flex flex-col items-center justify-center text-center p-8 animate-in zoom-in-95">
             <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl animate-bounce">
                <CheckCircle2 size={48} className="text-green-600" />
             </div>
             <h3 className="text-3xl font-bold text-white mb-2">Shift Started!</h3>
             <p className="text-green-100 text-lg mb-8">You checked in at 09:00 AM.</p>
             
             {/* Earnings Simulation Toast */}
             <div className="bg-white/10 rounded-xl p-4 flex flex-col gap-3 border border-white/20 w-full max-w-xs mx-auto animate-in slide-in-from-bottom-4 delay-500">
                <div className="flex items-center gap-3">
                    <ShieldCheck size={24} className="text-white" />
                    <div className="text-left">
                        <p className="text-xs text-green-200 uppercase font-bold">Reliability Score</p>
                        <p className="text-white font-bold">+1 Point Earned</p>
                    </div>
                </div>
                
                {/* Simulated Payment */}
                <div className="flex items-center gap-3 border-t border-white/10 pt-3">
                    <div className="p-1 bg-yellow-400 rounded-full text-yellow-900">
                        <Wallet size={16} />
                    </div>
                    <div className="text-left">
                        <p className="text-xs text-yellow-200 uppercase font-bold">Pending Payment</p>
                        <p className="text-white font-bold text-lg">+ 500 EGP</p>
                    </div>
                </div>
             </div>
         </div>
      )}

    </div>
  );
};
