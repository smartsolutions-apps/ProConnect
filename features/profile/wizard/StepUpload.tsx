
import React, { useState } from 'react';
import { UploadCloud, Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import { StepProps } from './types';

const PARSING_STAGES = [
  "Initializing Secure Upload...",
  "Parsing PDF Structure...",
  "Extracting Work History...",
  "Matching Skills to Standard Taxonomy...",
  "Optimizing for ATS Compatibility...",
  "Profile Ready."
];

export const StepUpload: React.FC<StepProps> = ({ onNext, updateData }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [parsingStageIndex, setParsingStageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 5) + 2;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          // HYPER-REAL SEED DATA SIMULATION
          updateData({
            name: "Amr Khaled",
            jobTitle: "Senior Software Engineer",
            university: "German University in Cairo (GUC)",
            location: "New Cairo (Fifth Settlement)",
            skills: ["React", "TypeScript", "Node.js", "System Design"],
            summary: ""
          });
          onNext();
        }, 800);
      }

      setUploadProgress(progress);
      const stageIndex = Math.min(
        Math.floor((progress / 100) * (PARSING_STAGES.length - 1)),
        PARSING_STAGES.length - 1
      );
      setParsingStageIndex(stageIndex);
    }, 100);
  };

  return (
    <div className="text-center animate-in fade-in slide-in-from-bottom-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Let's build your Smart Profile</h2>
        <p className="text-gray-500 mt-2">Drop your CV or LinkedIn PDF. We'll do the rest.</p>
      </div>

      <div 
        className={`relative border-2 border-dashed rounded-2xl p-10 transition-all duration-300 cursor-pointer overflow-hidden ${
          isDragging || uploadProgress > 0 
            ? 'border-brand-500 bg-brand-50' 
            : 'border-gray-200 hover:border-brand-400 hover:bg-gray-50'
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileUpload(); }}
        onClick={() => { if (uploadProgress === 0) handleFileUpload(); }}
      >
        {uploadProgress > 0 ? (
          <div className="py-8">
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm relative">
                <Loader2 size={32} className="text-brand-600 animate-spin" />
                <div className="absolute inset-0 border-4 border-brand-100 rounded-full"></div>
                <div 
                    className="absolute inset-0 border-4 border-brand-600 rounded-full border-t-transparent border-r-transparent border-l-transparent transform -rotate-45 transition-all duration-300"
                    style={{ transform: `rotate(${uploadProgress * 3.6}deg)` }}
                ></div>
             </div>
             <h3 className="text-lg font-bold text-gray-900 mb-2">{Math.round(uploadProgress)}%</h3>
             <p className="text-brand-700 font-medium text-sm animate-pulse">
                {PARSING_STAGES[parsingStageIndex]}
             </p>
          </div>
        ) : (
          <div className="py-8">
            <div className="w-20 h-20 bg-blue-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <UploadCloud size={40} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Click or Drag CV Here</h3>
            <p className="text-sm text-gray-500 mt-2 mb-6 max-w-xs mx-auto">
              Supports PDF, DOCX. Analyzed by Gemini AI for optimal matching.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
               <span className="flex items-center gap-1"><ShieldCheck size={12}/> Secure Parsing</span>
               <span className="flex items-center gap-1"><Sparkles size={12}/> AI Enhanced</span>
            </div>
          </div>
        )}
      </div>
      
      {uploadProgress === 0 && (
         <button onClick={onNext} className="mt-6 text-sm text-gray-400 hover:text-gray-600 underline">
            Skip and enter manually
         </button>
      )}
    </div>
  );
};
