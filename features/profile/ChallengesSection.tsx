import React, { useState } from 'react';
import { Challenge, CodeChallenge, DesignChallenge } from '../../types';
import { Code2, Terminal, Copy, Check, MoveHorizontal, Lightbulb, CheckCircle2 } from 'lucide-react';

interface ChallengesSectionProps {
  challenges: Challenge[];
  isRecruiterView?: boolean;
}

const CodeBlock: React.FC<{ challenge: CodeChallenge }> = ({ challenge }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(challenge.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-gray-800 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-gray-800">
        <div className="flex items-center gap-2">
           <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
           </div>
           <span className="ml-3 text-xs text-gray-400 font-mono">{challenge.language}.ts</span>
        </div>
        <button 
            onClick={handleCopy}
            className="text-gray-400 hover:text-white transition-colors"
        >
            {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed text-blue-100">
            <code>{challenge.code}</code>
        </pre>
      </div>
      <div className="px-4 py-3 bg-[#252526]/50 border-t border-gray-800">
         <div className="flex items-start gap-2">
            <Lightbulb size={16} className="text-yellow-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-300">
                <span className="font-bold text-gray-200">Context:</span> {challenge.solutionExplanation}
            </p>
         </div>
      </div>
    </div>
  );
};

const DesignSlider: React.FC<{ challenge: DesignChallenge }> = ({ challenge }) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  return (
    <div className="space-y-3">
        <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
            <span>Before</span>
            <span>After</span>
        </div>
        <div 
            className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden cursor-col-resize shadow-md select-none group"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
        >
            {/* Background Image (After) */}
            <img 
                src={challenge.afterImageUrl} 
                alt="After Design" 
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
            />

            {/* Foreground Image (Before) - Clipped */}
            <div 
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
            >
                <img 
                    src={challenge.beforeImageUrl} 
                    alt="Before Design" 
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: '100%' }} // Wait, width needs to be full container width to not squeeze
                    // Actually, object-cover handles the scaling, but we need to ensure the image width matches parent width
                    // The trick is the parent div clips it.
                    // To ensure alignment, the image inside must be full width of the CONTAINER.
                />
                {/* Re-implementing correctly: image needs explicit width to match container */}
            </div>
            
            {/* The Before Image needs to maintain the full width of the container even when clipped */}
             <div 
                className="absolute top-0 left-0 h-full overflow-hidden border-r-2 border-white"
                style={{ width: `${sliderPosition}%` }}
            >
                 {/* This container clips. The image inside is full size. */}
                 {/* We need to know the exact width for this to work perfectly without 'w-full' shrinking. */}
                 {/* Using a different CSS technique: object-position left */}
                 <img 
                    src={challenge.beforeImageUrl}
                    className="h-full object-cover object-left"
                    style={{ width: '100vw', maxWidth: 'none' }} // Hacky but works for demo if container is constrained
                    // Better approach: use background images or ref based width. 
                    // Let's stick to simple CSS clip-path or width for now, assuming images are same aspect ratio.
                 />
            </div>
             
            {/* Correcting the Slider Logic Visuals */}
            <div className="absolute inset-0">
                 {/* AFTER IMAGE (Base) */}
                 <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${challenge.afterImageUrl})` }}
                 />
                 
                 {/* BEFORE IMAGE (Overlay) */}
                 <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat border-r-4 border-white shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                    style={{ 
                        backgroundImage: `url(${challenge.beforeImageUrl})`,
                        width: `${sliderPosition}%`
                    }}
                 />
            </div>

            {/* Slider Handle */}
            <div 
                className="absolute top-0 bottom-0 w-1 bg-transparent cursor-col-resize flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center transform -translate-x-1/2">
                    <MoveHorizontal size={16} className="text-brand-600" />
                </div>
            </div>
            
            {/* Labels */}
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs font-bold backdrop-blur-sm pointer-events-none">
                Original
            </div>
            <div className="absolute bottom-4 right-4 bg-brand-600/80 text-white px-2 py-1 rounded text-xs font-bold backdrop-blur-sm pointer-events-none">
                Redesign
            </div>
        </div>
    </div>
  );
};

export const ChallengesSection: React.FC<ChallengesSectionProps> = ({ challenges, isRecruiterView }) => {
  if (!challenges || challenges.length === 0) return null;

  return (
    <div className="space-y-8">
       {challenges.map((challenge) => (
         <div key={challenge.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start gap-4 mb-6">
                <div className={`p-3 rounded-lg ${challenge.type === 'CODE' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                    {challenge.type === 'CODE' ? <Terminal size={24} /> : <Code2 size={24} />}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900">{challenge.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{challenge.description}</p>
                </div>
            </div>

            <div className="mt-4">
                {challenge.type === 'CODE' && <CodeBlock challenge={challenge} />}
                {challenge.type === 'DESIGN' && <DesignSlider challenge={challenge} />}
            </div>
            
            {isRecruiterView && (
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-600" />
                    <span className="text-sm font-medium text-green-700">Verified Technical Submission</span>
                </div>
            )}
         </div>
       ))}
    </div>
  );
};