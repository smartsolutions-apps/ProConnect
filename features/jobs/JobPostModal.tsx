
import React, { useState, useEffect } from 'react';
import { X, Sparkles, Building2, MapPin, Wallet, Zap, Briefcase, Check, Eye, CreditCard } from 'lucide-react';
import { Job, JobType } from '../../types';
import { JobCard } from './JobCard'; // Reusing for Live Preview
import { REF_JOB_TITLES, REF_LOCATIONS, REF_SKILLS } from '../../data';
import { SearchableDropdown } from '../../components/common/SearchableDropdown';
import { MultiSelectDropdown } from '../../components/common/MultiSelectDropdown';
import { PaymentModal } from '../payments/PaymentModal';

interface JobPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  companyLogo: string;
}

// 1. AUTO-FILL TEMPLATES (The "Concierge" Magic)
const JOB_TEMPLATES: Record<string, Partial<Job>> = {
  "Senior React Developer": {
    description: "We are looking for an experienced React Developer to lead our frontend team. You will be responsible for architecting scalable UI components, optimizing performance, and mentoring junior developers. Experience with Next.js and TypeScript is essential.",
    salaryRange: "EGP 60k - 85k",
  },
  "Product Manager": {
    description: "Drive the product vision and execution. You will work closely with engineering, design, and marketing to launch features that delight our users. Strong analytical skills and Agile experience required.",
    salaryRange: "EGP 50k - 70k",
  },
  "Digital Marketing Specialist": {
    description: "Manage our paid acquisition channels and social media strategy. You should be data-driven and creative, with a proven track record of improving ROI on Facebook and Google Ads.",
    salaryRange: "EGP 25k - 40k",
  }
};

const VIBE_TAGS = [
  { id: 'fast', label: '⚡ Fast Paced' },
  { id: 'remote', label: '🏠 Remote Friendly' },
  { id: 'corp', label: '👔 Corporate' },
  { id: 'chill', label: '☕ Relaxed' },
  { id: 'growth', label: '📈 High Growth' },
  { id: 'mentor', label: '🎓 Mentorship Focused' }
];

export const JobPostModal: React.FC<JobPostModalProps> = ({ isOpen, onClose, companyName, companyLogo }) => {
  // Form State
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState<JobType>(JobType.ON_SITE);
  const [salaryMin, setSalaryMin] = useState(10);
  const [salaryMax, setSalaryMax] = useState(30);
  const [description, setDescription] = useState('');
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [isEasyApply, setIsEasyApply] = useState(true);
  
  // Payment State
  const [showPayment, setShowPayment] = useState(false);

  // Auto-fill Effect
  useEffect(() => {
    if (role && JOB_TEMPLATES[role]) {
      setDescription(JOB_TEMPLATES[role].description || '');
      // Parse template salary to update sliders if needed (simplified for demo)
    }
  }, [role]);

  if (!isOpen) return null;

  // Construct Preview Object
  const previewJob: Job = {
    id: 'preview',
    // Fix: Added slug property
    slug: (role || 'job-title').toLowerCase().replace(/\s+/g, '-'),
    title: role || 'Job Title',
    companyId: 'preview_id',
    companyName: companyName,
    companyLogo: companyLogo,
    location: location || 'Cairo, Egypt',
    type: jobType,
    postedAt: 'Just now',
    description: description || 'Job description will appear here...',
    applicantsCount: 0,
    salaryRange: `EGP ${salaryMin}k - ${salaryMax}k`,
    isEasyApply: isEasyApply
  };

  const toggleVibe = (id: string) => {
    if (selectedVibes.includes(id)) {
      setSelectedVibes(prev => prev.filter(v => v !== id));
    } else {
      if (selectedVibes.length < 3) {
        setSelectedVibes(prev => [...prev, id]);
      }
    }
  };

  const handlePostClick = () => {
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    onClose();
    // In real app, trigger success toast here
    alert("Job Posted Successfully!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95">
        
        {/* LEFT: EDITOR */}
        <div className="w-full md:w-1/2 flex flex-col h-full border-r border-gray-100">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Job Creation Studio</h2>
              <p className="text-xs text-gray-500">Post a new role in under 60 seconds.</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full text-gray-500"><X size={20}/></button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Role Selection (Auto-Fill Trigger) */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Target Role <span className="text-brand-600">*</span></label>
              <SearchableDropdown 
                options={REF_JOB_TITLES}
                value={role}
                onChange={setRole}
                placeholder="e.g. Senior Frontend Engineer"
              />
              <p className="text-[10px] text-green-600 mt-1 flex items-center gap-1">
                <Sparkles size={10} /> Auto-fills description & skills
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Location</label>
                  <SearchableDropdown 
                    options={REF_LOCATIONS}
                    value={location}
                    onChange={setLocation}
                    placeholder="e.g. New Cairo"
                  />
               </div>
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Work Type</label>
                  <select 
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value as JobType)}
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg text-sm"
                  >
                    {Object.values(JobType).map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
               </div>
            </div>

            {/* Salary Slider */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
               <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Wallet size={16} className="text-brand-600"/> Salary Range (Monthly Net)
                  </label>
                  <span className="text-sm font-bold text-brand-700 bg-brand-50 px-2 py-1 rounded">
                    EGP {salaryMin}k - {salaryMax}k
                  </span>
               </div>
               <div className="px-2">
                  <input 
                    type="range" 
                    min="5" max="150" 
                    value={salaryMin} 
                    onChange={(e) => setSalaryMin(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                  />
                  <input 
                    type="range" 
                    min="5" max="150" 
                    value={salaryMax} 
                    onChange={(e) => setSalaryMax(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-600 mt-2"
                  />
               </div>
            </div>

            {/* Description Editor */}
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Job Description</label>
               <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500"
                  placeholder="Select a role above to auto-generate..."
               />
            </div>

            {/* Vibe Selector */}
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Company Vibe (Pick 3)</label>
               <div className="flex flex-wrap gap-2">
                  {VIBE_TAGS.map(tag => {
                    const isSelected = selectedVibes.includes(tag.id);
                    return (
                      <button
                        key={tag.id}
                        onClick={() => toggleVibe(tag.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                          isSelected 
                            ? 'bg-purple-50 border-purple-200 text-purple-700 shadow-sm transform scale-105' 
                            : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                        }`}
                      >
                        {tag.label}
                      </button>
                    );
                  })}
               </div>
            </div>

            <div className="flex items-center gap-2">
               <input 
                 type="checkbox" 
                 checked={isEasyApply}
                 onChange={(e) => setIsEasyApply(e.target.checked)}
                 className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
               />
               <span className="text-sm text-gray-700 font-medium">Enable "Easy Apply" (Recommended)</span>
            </div>

          </div>

          <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
             <button onClick={onClose} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-200 rounded-lg transition-colors">
               Cancel
             </button>
             <button 
               onClick={handlePostClick}
               disabled={!role}
               className="px-8 py-2.5 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 shadow-lg shadow-brand-200 transition-all flex items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
             >
               <CreditCard size={18} /> Pay & Post (2,500 EGP)
             </button>
          </div>
        </div>

        {/* RIGHT: LIVE PREVIEW */}
        <div className="w-full md:w-1/2 bg-gray-100 p-8 flex flex-col items-center justify-center relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
           
           <div className="relative z-10 w-full max-w-md">
              <div className="mb-4 flex items-center justify-between">
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                   <Eye size={14} /> Candidate View
                 </h3>
                 <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold">Live Preview</span>
              </div>
              
              {/* The Job Card Preview */}
              <div className="pointer-events-none transform transition-all duration-300">
                 <JobCard 
                    job={previewJob}
                    userLocation="New Cairo, Cairo" // Dummy for preview
                    onApply={() => {}}
                 />
              </div>

              {/* Vibe Tags Preview Overlay */}
              {selectedVibes.length > 0 && (
                <div className="mt-4 flex justify-center gap-2 animate-in slide-in-from-bottom-2">
                   {selectedVibes.map(vid => {
                     const tag = VIBE_TAGS.find(t => t.id === vid);
                     return (
                       <span key={vid} className="px-2 py-1 bg-white/80 backdrop-blur text-[10px] font-bold text-gray-600 rounded border border-gray-200 shadow-sm">
                         {tag?.label}
                       </span>
                     );
                   })}
                </div>
              )}
           </div>
        </div>

        {/* PAYMENT MODAL */}
        <PaymentModal 
            isOpen={showPayment}
            onClose={() => setShowPayment(false)}
            onSuccess={handlePaymentSuccess}
            amount={2500}
            title={`Posting Fee: ${role || 'New Job'}`}
        />

      </div>
    </div>
  );
};
