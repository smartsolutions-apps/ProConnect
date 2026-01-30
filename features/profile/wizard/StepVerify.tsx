
import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { StepProps } from './types';
import { SearchableDropdown } from '../../../components/common/SearchableDropdown';
import { MultiSelectDropdown } from '../../../components/common/MultiSelectDropdown';
import { generateProfileSummary } from '../../../services/geminiService';
import { REF_JOB_TITLES, REF_UNIVERSITIES, REF_LOCATIONS, REF_SKILLS } from '../../../data';

export const StepVerify: React.FC<StepProps> = ({ onNext, data, updateData }) => {
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    const summary = await generateProfileSummary(data.jobTitle, data.skills);
    updateData({ summary });
    setIsGeneratingSummary(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
       <div className="flex items-center gap-3 mb-6 bg-green-50 p-4 rounded-xl border border-green-100">
          <div className="p-2 bg-green-100 rounded-full text-green-600"><CheckCircle2 size={20} /></div>
          <div>
             <h3 className="font-bold text-green-900 text-sm">Resume Parsed Successfully</h3>
             <p className="text-xs text-green-700">Please verify the extracted details below.</p>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
              <input 
                type="text" value={data.name} onChange={(e) => updateData({ name: e.target.value })}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Current Role</label>
                <SearchableDropdown
                    options={REF_JOB_TITLES} value={data.jobTitle} onChange={(val) => updateData({ jobTitle: val })}
                    placeholder="Select Role..."
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">University</label>
                <SearchableDropdown
                    options={REF_UNIVERSITIES} value={data.university} onChange={(val) => updateData({ university: val })}
                    placeholder="Select University..."
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Location</label>
                <SearchableDropdown
                    options={REF_LOCATIONS} value={data.location} onChange={(val) => updateData({ location: val })}
                    placeholder="Select City..."
                />
            </div>
       </div>

       <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Core Skills</label>
          <MultiSelectDropdown
                options={REF_SKILLS} selectedValues={data.skills} onChange={(vals) => updateData({ skills: vals })}
                placeholder="Select Skills..."
            />
       </div>

       <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-bold text-gray-500 uppercase">Professional Summary</label>
            <button 
                onClick={handleGenerateSummary} disabled={isGeneratingSummary}
                className="flex items-center gap-1.5 text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded-md hover:bg-brand-100"
            >
                <Sparkles size={12} /> {isGeneratingSummary ? 'Writing...' : 'AI Rewrite'}
            </button>
          </div>
          <textarea 
            value={data.summary} onChange={(e) => updateData({ summary: e.target.value })}
            rows={3}
            className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500"
            placeholder="Parsed summary will appear here..."
          />
       </div>

       <div className="flex justify-end pt-4">
          <button 
            onClick={onNext}
            className="px-8 py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-200 transition-all flex items-center gap-2"
          >
             Confirm & Continue <ChevronRight size={18} />
          </button>
       </div>
    </div>
  );
};
