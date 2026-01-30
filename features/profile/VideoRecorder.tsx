
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Camera, Mic, StopCircle, Play, RefreshCw, CheckCircle2, AlertCircle, Wand2 } from 'lucide-react';

const PROMPTS = [
  { id: 1, text: "Start with your Name, Title, and Current Location.", duration: 5 },
  { id: 2, text: "Briefly describe your Education and Key Technical Skills.", duration: 10 },
  { id: 3, text: "What is your Career Ambition and why this industry?", duration: 10 },
  { id: 4, text: "Wrap up! Say thank you.", duration: 5 }
];

const TOTAL_DURATION = 30;

export const VideoRecorder: React.FC<{ onSave: (blob: Blob) => void }> = ({ onSave }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  
  // State Machine
  const [status, setStatus] = useState<'IDLE' | 'ALIGNING' | 'RECORDING' | 'REVIEW'>('IDLE');
  const [isAligned, setIsAligned] = useState(false);
  const [aiBackgroundActive, setAiBackgroundActive] = useState(true);
  
  // Teleprompter State
  const [timeLeft, setTimeLeft] = useState(TOTAL_DURATION);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  // 1. Initialize Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 720, height: 1280, facingMode: "user" }, // Vertical Aspect Ratio preferred
        audio: true 
      });
      setStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setStatus('ALIGNING');
      processVideoFrame(); // Start AI loop
    } catch (err) {
      console.error("Camera Error:", err);
      alert("Could not access camera. Please allow permissions.");
    }
  };

  // 2. The "AI Background" Loop (Simulated for Demo)
  // In a real production build, this is where @mediapipe/selfie_segmentation would inject
  const processVideoFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !aiBackgroundActive) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (ctx && video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw Video
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // SIMULATION: If AI Background is active, we apply a subtle "Studio" filter
      // Real implementation would mask the user here.
      if (aiBackgroundActive) {
        // Simulating the "Clean Up" look by brightening 
        ctx.globalCompositeOperation = 'overlay';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';
      }
    }
    requestAnimationFrame(processVideoFrame);
  }, [aiBackgroundActive]);

  // 3. Recording Logic
  const startRecording = () => {
    if (!stream) return;
    const mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setStatus('RECORDING');
    setTimeLeft(TOTAL_DURATION);
    setCurrentPromptIndex(0);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setStatus('REVIEW');
  };

  // 4. Timer & Teleprompter Logic
  useEffect(() => {
    let interval: any;
    if (status === 'RECORDING' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          // Calculate which prompt we should be on
          const timeElapsed = TOTAL_DURATION - newTime;
          let accumulator = 0;
          let foundIndex = 0;
          
          for (let i = 0; i < PROMPTS.length; i++) {
            accumulator += PROMPTS[i].duration;
            if (timeElapsed < accumulator) {
              foundIndex = i;
              break;
            }
          }
          setCurrentPromptIndex(foundIndex);
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0 && status === 'RECORDING') {
      stopRecording();
    }
    return () => clearInterval(interval);
  }, [status, timeLeft]);

  // 5. Save / Retake
  const handleSave = () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    onSave(blob);
  };

  const handleRetake = () => {
    setRecordedChunks([]);
    setStatus('ALIGNING');
    setIsAligned(false);
  };

  // --- UI COMPONENTS ---

  const GhostMask = () => (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
      <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
        <defs>
          <mask id="hole">
            <rect width="100%" height="100%" fill="white"/>
            {/* Head */}
            <ellipse cx="50" cy="35" rx="14" ry="18" fill="black"/>
            {/* Shoulders */}
            <path d="M 20 100 Q 20 70 50 70 Q 80 70 80 100" fill="black"/>
          </mask>
        </defs>
        
        {/* The Overlay Darkener */}
        <rect width="100%" height="100%" fill="rgba(0,0,0,0.5)" mask="url(#hole)" />
        
        {/* The Dashed Guide Line */}
        <ellipse cx="50" cy="35" rx="14" ry="18" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 2"/>
        <path d="M 20 100 Q 20 70 50 70 Q 80 70 80 100" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 2"/>
      </svg>
      
      {/* Alignment Instructions */}
      {!isAligned && status === 'ALIGNING' && (
        <div className="absolute top-1/2 mt-20 text-center w-full animate-pulse">
            <p className="text-white font-bold text-lg drop-shadow-md">Align face & shoulders</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl relative aspect-[9/16]">
      {/* --- VIDEO LAYER --- */}
      <video 
        ref={videoRef} 
        autoPlay 
        muted 
        playsInline 
        className={`absolute inset-0 w-full h-full object-cover transform scale-x-[-1] ${status === 'REVIEW' ? 'hidden' : 'block'}`}
      />
      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* --- REVIEW PLAYBACK LAYER --- */}
      {status === 'REVIEW' && recordedChunks.length > 0 && (
         <video 
            src={URL.createObjectURL(new Blob(recordedChunks, { type: "video/webm" }))} 
            controls 
            className="absolute inset-0 w-full h-full object-cover bg-black" 
         />
      )}

      {/* --- OVERLAYS --- */}
      {(status === 'ALIGNING' || status === 'RECORDING') && <GhostMask />}

      {/* --- UI HEADER --- */}
      <div className="absolute top-0 left-0 right-0 p-4 z-30 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${status === 'RECORDING' ? 'bg-red-600 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-white text-xs font-mono">
                {status === 'RECORDING' ? `REC 00:${30 - timeLeft}` : status === 'REVIEW' ? 'REVIEW' : 'READY'}
            </span>
        </div>
        
        {status !== 'REVIEW' && (
            <button 
                onClick={() => setAiBackgroundActive(!aiBackgroundActive)}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold border ${aiBackgroundActive ? 'bg-white text-black border-white' : 'bg-black/50 text-white border-white/30'}`}
            >
                <Wand2 size={10} />
                {aiBackgroundActive ? 'Studio: ON' : 'Studio: OFF'}
            </button>
        )}
      </div>

      {/* --- TELEPROMPTER --- */}
      {status === 'RECORDING' && (
        <div className="absolute top-20 left-4 right-4 z-30">
            <div className="bg-black/70 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg transition-all duration-500 transform translate-y-0">
                <p className="text-brand-400 text-xs font-bold uppercase mb-1">Prompt {currentPromptIndex + 1}/{PROMPTS.length}</p>
                <h3 className="text-white text-lg font-semibold leading-tight">{PROMPTS[currentPromptIndex].text}</h3>
                
                {/* Progress Bar for Current Prompt */}
                <div className="w-full bg-gray-700 h-1 mt-3 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 transition-all duration-1000 ease-linear" style={{ width: `${(1 - (timeLeft / TOTAL_DURATION)) * 100}%` }}></div>
                </div>
            </div>
        </div>
      )}

      {/* --- CONTROLS FOOTER --- */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-30 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        
        {status === 'IDLE' && (
            <button 
                onClick={startCamera}
                className="w-full py-4 bg-brand-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-brand-500 transition-all"
            >
                <Camera size={20} /> Enable Camera
            </button>
        )}

        {status === 'ALIGNING' && (
            <div className="flex flex-col gap-3">
                 {!isAligned ? (
                    <button 
                        onClick={() => setIsAligned(true)}
                        className="w-full py-4 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-all"
                    >
                        <CheckCircle2 size={20} /> I Am Aligned
                    </button>
                 ) : (
                    <button 
                        onClick={startRecording}
                        className="w-full py-4 bg-red-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-red-700 transition-all animate-in fade-in slide-in-from-bottom-2"
                    >
                        <div className="w-3 h-3 bg-white rounded-full"></div> Start Pitch (30s)
                    </button>
                 )}
                 <p className="text-white/60 text-xs text-center flex items-center justify-center gap-1">
                    <AlertCircle size={12}/> Background will be standardized white
                 </p>
            </div>
        )}

        {status === 'RECORDING' && (
            <button 
                onClick={stopRecording}
                className="w-16 h-16 mx-auto border-4 border-white rounded-full flex items-center justify-center bg-red-600 hover:bg-red-700 transition-all"
            >
                <div className="w-6 h-6 bg-white rounded-sm"></div>
            </button>
        )}

        {status === 'REVIEW' && (
            <div className="flex gap-3">
                <button 
                    onClick={handleRetake}
                    className="flex-1 py-3 bg-white/10 backdrop-blur text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
                >
                    <RefreshCw size={18} /> Retake
                </button>
                <button 
                    onClick={handleSave}
                    className="flex-1 py-3 bg-brand-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-brand-500 transition-all"
                >
                    <CheckCircle2 size={18} /> Save Pitch
                </button>
            </div>
        )}
      </div>
    </div>
  );
};
