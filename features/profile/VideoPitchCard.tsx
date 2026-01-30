
import React, { useRef, useState } from 'react';
import { Play, Volume2, VolumeX, Maximize2 } from 'lucide-react';

interface VideoPitchCardProps {
  videoUrl: string;
  candidateName: string;
  role: string;
}

export const VideoPitchCard: React.FC<VideoPitchCardProps> = ({ videoUrl, candidateName, role }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Autoplay blocked:", e));
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset to start for standardized viewing
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <div 
        className="relative aspect-[9/16] bg-gray-900 rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-xl hover:border-brand-500 transition-all duration-300 group cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
      <video 
        ref={videoRef}
        src={videoUrl}
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover"
        loop
      />

      {/* Overlay Gradient (Always visible for readability) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

      {/* Play Button Indicator (Hides on Play) */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
            <Play size={20} className="text-white fill-white ml-1" />
        </div>
      </div>

      {/* Controls (Show on Hover) */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
            onClick={toggleMute}
            className="p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70"
        >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      </div>

      {/* Candidate Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform">
        <div className="flex items-center gap-2 mb-1">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-[10px] font-bold uppercase tracking-wider text-green-400">Video Pitch</span>
        </div>
        <h3 className="text-white font-bold text-lg leading-tight truncate">{candidateName}</h3>
        <p className="text-gray-300 text-xs truncate">{role}</p>
        
        {/* Progress Bar (Visual only) */}
        <div className="w-full bg-gray-700 h-0.5 mt-3 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
           <div className={`h-full bg-brand-500 ${isPlaying ? 'animate-[progress_30s_linear]' : ''}`}></div>
        </div>
      </div>
    </div>
  );
};
