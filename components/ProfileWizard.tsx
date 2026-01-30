import React, { useState } from 'react';
import { Sparkles, Linkedin, Upload, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';
import { generateProfileSummary } from '../services/geminiService';
import { UNIVERSITIES, LOCATIONS } from '../data/seedData';

interface ProfileWizardProps {
  onComplete: () => void;
}

export const ProfileWizard: React.FC<ProfileWizardProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    university: '',
    location: '',
    skills: [] as string[],
    summary: ''
  });

  const handleImportLinkedIn = () => {
    // Simulation of LinkedIn Import
    setIsGenerating(true);
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        name: "Amr Khaled",
        jobTitle: "Senior Frontend Engineer",
        university: "German University in Cairo (GUC)",
        location: "New Cairo, Cairo",
        skills: ["React", "JavaScript", "CSS"],
        summary: ""
      }));
      setIsGenerating(false);
      setStep(2);
    }, 1500);
  };

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    const summary = await generateProfileSummary(formData.jobTitle, formData.skills);
    setFormData(prev => ({ ...prev, summary }));
    setIsGenerating(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden my-8">
      {/* Progress Bar */}
      <div className="h-1 bg-gray-100">
        <div 
          className="h-full bg-brand-600 transition-all duration-500 ease-out"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <div className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Let's build your professional identity</h2>
          <p className="text-gray-500 mt-2">The Concierge Standard: We do the heavy lifting for you.</p>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div 
              onClick={handleImportLinkedIn}
              className="group border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 transition-all"
            >
              {isGenerating ? (
                <div className="flex flex-col items-center py-4">
                  <Loader2 className="animate-spin text-brand-600 mb-2" size={32} />
                  <p className="text-brand-800 font-medium">Analyzing LinkedIn Profile...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center py-4">
                  <div className="bg-blue-600 p-3 rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <Linkedin className="text-white" size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Import from LinkedIn</h3>
                  <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
                    Instantly populate your education, experience, and skills.
                  </p>
                </div>
              )}
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or start manually</span>
              </div>
            </div>

            <button 
              onClick={() => setStep(2)}
              className="w-full py-3 bg-gray-50 text-gray-600 font-semibold rounded-lg hover:bg-gray-100"
            >
              Enter details manually
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                placeholder="e.g. Sara Ahmed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Role</label>
                <input 
                  type="text" 
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="e.g. Sales Manager"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                >
                  <option value="">Select City</option>
                  {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
              <select 
                value={formData.university}
                onChange={(e) => setFormData({...formData, university: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white"
              >
                <option value="">Select University</option>
                {UNIVERSITIES.map(uni => <option key={uni} value={uni}>{uni}</option>)}
              </select>
            </div>

            <div className="pt-4 flex justify-end">
              <button 
                onClick={() => setStep(3)}
                className="flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700"
              >
                Next Step <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">AI Professional Summary</label>
                <button 
                  onClick={handleGenerateSummary}
                  disabled={isGenerating}
                  className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-1 rounded-md hover:bg-brand-100"
                >
                  <Sparkles size={14} />
                  {isGenerating ? 'Generating...' : 'Auto-Generate'}
                </button>
              </div>
              <textarea 
                value={formData.summary}
                onChange={(e) => setFormData({...formData, summary: e.target.value})}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500"
                placeholder="Click Auto-Generate to create a professional summary tailored for the Egyptian market..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Powered by Gemini. Tailored for top companies like Vodafone & CIB.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg flex gap-3">
              <CheckCircle2 className="text-green-600 flex-shrink-0" size={24} />
              <div>
                <h4 className="text-sm font-bold text-green-900">Profile Ready!</h4>
                <p className="text-xs text-green-700 mt-1">
                  Your profile has been optimized for search visibility among recruiters in {formData.location || 'Egypt'}.
                </p>
              </div>
            </div>

            <button 
              onClick={onComplete}
              className="w-full py-3 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 shadow-lg shadow-brand-200"
            >
              Launch ProConnect Feed
            </button>
          </div>
        )}
      </div>
    </div>
  );
};