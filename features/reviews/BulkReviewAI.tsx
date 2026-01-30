
import React, { useState } from 'react';
import { Mic, Square, Sparkles, X, Wand2 } from 'lucide-react';
import { MOCK_TRANSCRIPT, parseReviewTranscript, ParsedReview } from './logic';
import { USERS } from '../../data';
import { ReviewConfirmation } from './ReviewConfirmation';

interface BulkReviewAIProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BulkReviewAI: React.FC<BulkReviewAIProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'RECORD' | 'ANALYZING' | 'CONFIRM' | 'SUCCESS'>('RECORD');
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [parsedResults, setParsedResults] = useState<ParsedReview[]>([]);

  if (!isOpen) return null;

  const handleToggleRecord = () => {
    if (isRecording) {
      // STOP RECORDING
      setIsRecording(false);
      setTranscript(MOCK_TRANSCRIPT);
    } else {
      // START RECORDING
      setIsRecording(true);
      setTranscript(''); // Clear previous
    }
  };

  const handleAnalyze = () => {
    setStep('ANALYZING');
    setTimeout(() => {
        const results = parseReviewTranscript(transcript, USERS);
        setParsedResults(results);
        setStep('CONFIRM');
    }, 1500);
  };

  const handleSubmit = () => {
    setStep('SUCCESS');
    // Simulate API save
    setTimeout(() => {
        onClose();
        setStep('RECORD');
        setTranscript('');
        setParsedResults([]);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white flex justify-between items-center">
            <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Sparkles size={20} className="text-yellow-300" /> AI Bulk Review
                </h2>
                <p className="text-purple-100 text-sm mt-1">Speak naturally. We'll fill the forms.</p>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors"><X size={20}/></button>
        </div>

        <div className="p-6">
            {step === 'RECORD' && (
                <div className="space-y-6">
                    <div className="text-center">
                        <button 
                            onClick={handleToggleRecord}
                            className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all shadow-xl ${
                                isRecording 
                                    ? 'bg-red-500 animate-pulse ring-8 ring-red-100' 
                                    : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105'
                            }`}
                        >
                            {isRecording ? <Square size={32} className="fill-white text-white"/> : <Mic size={40} className="text-white"/>}
                        </button>
                        <p className="mt-4 font-bold text-gray-900">
                            {isRecording ? 'Listening...' : 'Tap to Record Summary'}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            "Ahmed was great, Sarah was late..."
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 min-h-[120px] relative">
                        {transcript ? (
                            <p className="text-gray-800 leading-relaxed">{transcript}</p>
                        ) : (
                            <p className="text-gray-400 italic text-center mt-8">Transcript will appear here...</p>
                        )}
                        {isRecording && (
                            <div className="absolute bottom-4 right-4 flex gap-1">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                            </div>
                        )}
                    </div>

                    <button 
                        onClick={handleAnalyze}
                        disabled={!transcript || isRecording}
                        className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                    >
                        <Wand2 size={18} /> Analyze Performance
                    </button>
                </div>
            )}

            {step === 'ANALYZING' && (
                <div className="py-12 text-center">
                    <div className="relative w-24 h-24 mx-auto mb-6">
                        <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                        <Sparkles size={32} className="absolute inset-0 m-auto text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing Sentiment</h3>
                    <p className="text-gray-500">Matching names to your staff list...</p>
                </div>
            )}

            {step === 'CONFIRM' && (
                <ReviewConfirmation 
                    reviews={parsedResults} 
                    onSubmit={handleSubmit} 
                    onCancel={() => setStep('RECORD')} 
                />
            )}

            {step === 'SUCCESS' && (
                <div className="py-12 text-center">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm animate-bounce">
                        <Sparkles size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Reviews Submitted!</h3>
                    <p className="text-gray-500 mb-6">
                        ProScores have been updated for {parsedResults.length} staff members.
                    </p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
