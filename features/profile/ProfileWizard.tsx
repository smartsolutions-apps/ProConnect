
import React, { useState } from 'react';
import { WizardFormData, WizardStep } from './wizard/types';
import { StepUpload } from './wizard/StepUpload';
import { StepVerify } from './wizard/StepVerify';
import { StepVideoPitch } from './wizard/StepVideoPitch';
import { StepSuccess } from './wizard/StepSuccess';

interface ProfileWizardProps {
  onComplete: () => void;
}

export const ProfileWizard: React.FC<ProfileWizardProps> = ({ onComplete }) => {
  const [step, setStep] = useState<WizardStep>('UPLOAD');
  const [formData, setFormData] = useState<WizardFormData>({
    name: '', jobTitle: '', university: '', location: '', skills: [], summary: ''
  });

  const updateData = (updates: Partial<WizardFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const getProgressWidth = () => {
    switch(step) {
      case 'UPLOAD': return '33%';
      case 'VERIFY': return '66%';
      case 'PITCH': return '100%';
      default: return '100%';
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto my-4 lg:my-12">
      {/* Container Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative">
        
        {/* Minimal Header */}
        {step !== 'SUCCESS' && (
          <div className="px-8 pt-8 pb-0">
             <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold text-gray-900">
                  {step === 'UPLOAD' && 'Import Profile'}
                  {step === 'VERIFY' && 'Review Details'}
                  {step === 'PITCH' && 'Video Introduction'}
                </h1>
                <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                   Step {step === 'UPLOAD' ? 1 : step === 'VERIFY' ? 2 : 3}/3
                </span>
             </div>
             
             {/* Sleek Progress Bar */}
             <div className="h-1 bg-gray-100 rounded-full overflow-hidden w-full">
                <div 
                    className="h-full bg-brand-600 shadow-[0_0_10px_rgba(14,165,233,0.5)] transition-all duration-700 ease-in-out rounded-full"
                    style={{ width: getProgressWidth() }}
                />
             </div>
          </div>
        )}

        {/* Content Area */}
        <div className="p-8">
          {step === 'UPLOAD' && (
              <StepUpload 
                  onNext={() => setStep('VERIFY')} 
                  data={formData} 
                  updateData={updateData} 
              />
          )}
          {step === 'VERIFY' && (
              <StepVerify 
                  onNext={() => setStep('PITCH')} 
                  data={formData} 
                  updateData={updateData} 
              />
          )}
          {step === 'PITCH' && (
              <StepVideoPitch 
                  onNext={() => setStep('SUCCESS')} 
                  data={formData} 
                  updateData={updateData} 
              />
          )}
          {step === 'SUCCESS' && (
              <StepSuccess onComplete={onComplete} />
          )}
        </div>
      </div>

      {/* Trust Footer */}
      <div className="text-center mt-6">
        <p className="text-xs text-gray-400 font-medium flex items-center justify-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span> 
          Secure Connection • Powered by Gemini AI
        </p>
      </div>
    </div>
  );
};
