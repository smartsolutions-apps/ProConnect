
import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Wallet, CheckCircle2, AlertCircle, TrendingUp, ShieldCheck } from 'lucide-react';
import { User } from '../../types';

interface SalarySectionProps {
  user: User;
  isRecruiterView: boolean;
}

export const SalarySection: React.FC<SalarySectionProps> = ({ user, isRecruiterView }) => {
  // Mock State for the interactive part of "Candidate View"
  const [minSalary, setMinSalary] = useState(user.salaryExpectations?.min || 0);
  const [expectedSalary, setExpectedSalary] = useState(user.salaryExpectations?.expected || 0);

  // Mock Recruiter Budget (Hidden Logic)
  // In a real app, this would come from the specific Job listing the recruiter is trying to match.
  const MOCK_RECRUITER_BUDGET_MAX = 55000; 

  // Match Logic
  const isWithinBudget = minSalary <= MOCK_RECRUITER_BUDGET_MAX;

  return (
    <div className={`rounded-xl shadow-sm border p-6 transition-all duration-500 ${isRecruiterView ? 'bg-white border-blue-100' : 'bg-gray-900 border-gray-800 text-white'}`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className={`text-lg font-bold flex items-center gap-2 ${isRecruiterView ? 'text-gray-900' : 'text-white'}`}>
            <Wallet size={20} className={isRecruiterView ? 'text-brand-600' : 'text-brand-400'} />
            Salary Expectations
          </h3>
          <p className={`text-sm mt-1 ${isRecruiterView ? 'text-gray-500' : 'text-gray-400'}`}>
            {isRecruiterView 
              ? "Budget compatibility check based on your role's limit." 
              : "Private to you. We match ranges, never revealing exact numbers."}
          </p>
        </div>
        
        <div className={`p-2 rounded-full ${isRecruiterView ? 'bg-blue-50 text-blue-600' : 'bg-gray-800 text-gray-400'}`}>
          {isRecruiterView ? <ShieldCheck size={20} /> : <Lock size={20} />}
        </div>
      </div>

      {isRecruiterView ? (
        // --- RECRUITER VIEW (PROTECTED) ---
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 animate-in fade-in">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Budget Status</span>
            <span className="text-xs text-gray-400">Candidate's exact figures are hidden</span>
          </div>

          <div className="flex items-center gap-4">
             {isWithinBudget ? (
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-sm">
                      <CheckCircle2 size={24} />
                   </div>
                   <div>
                      <h4 className="text-lg font-bold text-green-700">Within Budget</h4>
                      <p className="text-sm text-green-600">Candidate expectations align with the <strong>EGP {MOCK_RECRUITER_BUDGET_MAX.toLocaleString()}</strong> limit.</p>
                   </div>
                </div>
             ) : (
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center shadow-sm">
                      <AlertCircle size={24} />
                   </div>
                   <div>
                      <h4 className="text-lg font-bold text-red-700">Above Budget</h4>
                      <p className="text-sm text-red-600">Candidate expectations exceed the <strong>EGP {MOCK_RECRUITER_BUDGET_MAX.toLocaleString()}</strong> limit.</p>
                   </div>
                </div>
             )}
          </div>
        </div>
      ) : (
        // --- CANDIDATE VIEW (EDITABLE) ---
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Minimum Net Salary (Monthly)</label>
              <div className="relative">
                 <span className="absolute left-3 top-3 text-gray-500 font-medium">EGP</span>
                 <input 
                    type="number" 
                    value={minSalary}
                    onChange={(e) => setMinSalary(Number(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-600 text-white font-bold rounded-lg py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                 />
              </div>
              <p className="text-[10px] text-gray-500 mt-2 flex items-center gap-1">
                 <AlertCircle size={10} /> Recruiter sees "Above Budget" if below this.
              </p>
           </div>

           <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <label className="text-xs font-bold text-brand-400 uppercase mb-2 block flex items-center gap-1">
                 Target Salary <TrendingUp size={12}/>
              </label>
              <div className="relative">
                 <span className="absolute left-3 top-3 text-gray-500 font-medium">EGP</span>
                 <input 
                    type="number" 
                    value={expectedSalary}
                    onChange={(e) => setExpectedSalary(Number(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-600 text-white font-bold rounded-lg py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                 />
              </div>
              <p className="text-[10px] text-gray-500 mt-2">
                 Your ideal number. We use this for "Perfect Match" highlights.
              </p>
           </div>
        </div>
      )}
    </div>
  );
};
