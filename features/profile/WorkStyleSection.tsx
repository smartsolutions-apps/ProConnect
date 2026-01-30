
import React, { useState } from 'react';
import { RadarChart } from '../../components/common/RadarChart';
import { WorkStyle } from '../../types';
import { BrainCircuit, CheckCircle2, ChevronRight, Users, ToggleLeft, ToggleRight, Loader2 } from 'lucide-react';

interface WorkStyleSectionProps {
  initialData?: WorkStyle;
  isRecruiterMode: boolean; // Lifted state
}

const AXES = ['Leadership', 'Teamwork', 'Independence', 'Creativity', 'Logic'];

const QUIZ_QUESTIONS = [
  {
    axis: 'leadership',
    question: "When a project hits a roadblock, what is your instinctive reaction?",
    options: [
      { text: "Wait for instructions from management.", score: 2 },
      { text: "Ask the team what they think we should do.", score: 5 },
      { text: "Take charge immediately and assign tasks.", score: 9 }
    ]
  },
  {
    axis: 'teamwork',
    question: "Which environment do you thrive in the most?",
    options: [
      { text: "A quiet room with zero interruptions.", score: 2 },
      { text: "A mix of focus time and meetings.", score: 6 },
      { text: "A bustling open office with constant collaboration.", score: 10 }
    ]
  },
  {
    axis: 'independence',
    question: "How do you handle a vague project brief?",
    options: [
      { text: "I need detailed requirements before starting.", score: 2 },
      { text: "I ask clarifying questions then proceed.", score: 6 },
      { text: "I love the freedom to define it myself.", score: 10 }
    ]
  },
  {
    axis: 'creativity',
    question: "Do you prefer established processes or inventing new ways?",
    options: [
      { text: "Follow the proven process. Why risk it?", score: 3 },
      { text: "Optimize existing processes slightly.", score: 6 },
      { text: "Tear it down and build something better.", score: 9 }
    ]
  },
  {
    axis: 'logic',
    question: "When making a hard decision, what do you rely on?",
    options: [
      { text: "My gut feeling and intuition.", score: 3 },
      { text: "A mix of data and experience.", score: 7 },
      { text: "Pure data metrics and spreadsheets.", score: 10 }
    ]
  }
];

// Mock Data for "Ideal Candidate" overlay
const IDEAL_CANDIDATE_PROFILE: Record<string, number> = {
  leadership: 8,
  teamwork: 7,
  independence: 9,
  creativity: 6,
  logic: 9
};

export const WorkStyleSection: React.FC<WorkStyleSectionProps> = ({ initialData, isRecruiterMode }) => {
  const [data, setData] = useState<WorkStyle>(initialData || {
    leadership: 5, teamwork: 5, independence: 5, creativity: 5, logic: 5
  });
  
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  // Convert WorkStyle object to Record<string, number> for the chart
  const chartData = {
    leadership: data.leadership,
    teamwork: data.teamwork,
    independence: data.independence,
    creativity: data.creativity,
    logic: data.logic
  };

  const handleQuizAnswer = (score: number, axis: string) => {
    const newScores = { ...quizScores, [axis]: score };
    setQuizScores(newScores);

    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      // Quiz Complete
      finishQuiz(newScores);
    }
  };

  const finishQuiz = (finalScores: Record<string, number>) => {
    setIsCalculating(true);
    setTimeout(() => {
        setData({
            leadership: finalScores['leadership'],
            teamwork: finalScores['teamwork'],
            independence: finalScores['independence'],
            creativity: finalScores['creativity'],
            logic: finalScores['logic']
        });
        setIsCalculating(false);
        setIsQuizOpen(false);
        setCurrentQuestionIdx(0);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-hidden relative">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <BrainCircuit className="text-brand-600" size={24} />
            Work Style & Personality
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Visualizing your professional archetype.
          </p>
        </div>
        
        <div className="flex items-center gap-3 mt-4 md:mt-0">
            {/* Toggle moved to Parent, only Action buttons remain */}
            <button 
                onClick={() => setIsQuizOpen(true)}
                className="px-3 py-1.5 bg-brand-50 text-brand-700 text-xs font-bold rounded-lg hover:bg-brand-100 transition-colors"
            >
                Retake Quiz
            </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
         {/* CHART */}
         <div className="w-full md:w-1/2 flex justify-center">
            <RadarChart 
                data={chartData} 
                overlayData={isRecruiterMode ? IDEAL_CANDIDATE_PROFILE : undefined}
                axes={AXES} 
                size={300} 
            />
         </div>

         {/* INSIGHTS */}
         <div className="w-full md:w-1/2 space-y-4">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-2">Your Archetype: The Balanced Architect</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                    You possess a strong balance between <strong>Logic ({data.logic}/10)</strong> and <strong>Creativity ({data.creativity}/10)</strong>. 
                    This makes you ideal for technical leadership roles where you need to innovate while maintaining structural integrity.
                </p>
            </div>

            {isRecruiterMode && (
                <div className="bg-green-50 rounded-xl p-4 border border-green-100 animate-in slide-in-from-right-4">
                    <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                        <Users size={16} /> fit Analysis
                    </h4>
                    <p className="text-sm text-green-800 leading-relaxed mb-2">
                        <strong>92% Match</strong> with the "Senior Engineer" profile at Vodafone.
                    </p>
                    <ul className="text-xs text-green-700 space-y-1 list-disc list-inside">
                        <li>Logic score aligns perfectly with requirements.</li>
                        <li>Slightly higher Creativity than expected (Bonus).</li>
                        <li>Teamwork score is ideal for agile squads.</li>
                    </ul>
                </div>
            )}
         </div>
      </div>

      {/* QUIZ MODAL */}
      {isQuizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95">
                {isCalculating ? (
                    <div className="p-12 text-center">
                        <Loader2 size={48} className="text-brand-600 animate-spin mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900">Calculating your profile...</h3>
                        <p className="text-gray-500">Mapping your answers to the 5-point axis.</p>
                    </div>
                ) : (
                    <>
                        <div className="bg-brand-600 p-6 text-white">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-bold uppercase opacity-80">Question {currentQuestionIdx + 1} of {QUIZ_QUESTIONS.length}</span>
                                <span className="text-xs font-bold uppercase opacity-80">{QUIZ_QUESTIONS[currentQuestionIdx].axis}</span>
                            </div>
                            <h3 className="text-xl font-bold leading-tight">
                                {QUIZ_QUESTIONS[currentQuestionIdx].question}
                            </h3>
                        </div>
                        <div className="p-6 space-y-3">
                            {QUIZ_QUESTIONS[currentQuestionIdx].options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleQuizAnswer(opt.score, QUIZ_QUESTIONS[currentQuestionIdx].axis)}
                                    className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-brand-500 hover:bg-brand-50 transition-all group"
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-brand-700">{opt.text}</span>
                                        <ChevronRight size={16} className="text-gray-300 group-hover:text-brand-500" />
                                    </div>
                                </button>
                            ))}
                        </div>
                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-center">
                            <button onClick={() => setIsQuizOpen(false)} className="text-sm text-gray-400 hover:text-gray-600">Cancel Assessment</button>
                        </div>
                    </>
                )}
             </div>
        </div>
      )}
    </div>
  );
};
