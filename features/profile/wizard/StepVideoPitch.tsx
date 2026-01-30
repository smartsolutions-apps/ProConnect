
import React from 'react';
import { Video, Coins } from 'lucide-react';
import { StepProps } from './types';
import { VideoRecorder } from '../VideoRecorder';

export const StepVideoPitch: React.FC<StepProps> = ({ onNext }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4">
        <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center p-3 bg-purple-100 text-purple-600 rounded-full mb-4">
                <Video size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Stand Out with Video</h2>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
                Profiles with a video pitch get <strong>4x more recruiter views</strong>. 
                Record a quick 30s intro now.
            </p>
        </div>

        <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl mb-6 border border-gray-800">
            <VideoRecorder onSave={() => onNext()} />
        </div>

        <div className="flex justify-between items-center px-4">
            <button 
                onClick={onNext}
                className="text-sm text-gray-400 hover:text-gray-600 font-medium"
            >
                Skip for now
            </button>
            <div className="flex items-center gap-2 text-xs text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded-full">
                <Coins size={12} />
                +50 Coins Bonus
            </div>
        </div>
    </div>
  );
};
