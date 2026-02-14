import React, { useState } from 'react';
import { X, ShieldCheck, MapPin, Building2, Globe, FileText, CheckCircle2, Save } from 'lucide-react';
import { Company } from '../../types';

interface AdminCompanyEditorProps {
  company: Company;
  onClose: () => void;
  onSave: (company: Company) => void;
}

const BRANDFETCH_CLIENT_ID = "1idiSqP5yegNdsQZndZ";
const FALLBACK_LOGO = "https://ui-avatars.com/api/?name=Real+Estate&background=0D8ABC&color=fff&rounded=true&bold=true";

export const AdminCompanyEditor: React.FC<AdminCompanyEditorProps> = ({ company, onClose, onSave }) => {
  const [formData, setFormData] = useState<Company>({ ...company });

  const handleSave = () => {
    onSave(formData);
  };

  const currentLogoUrl = formData.logoUrl || `https://cdn.brandfetch.io/domain/${formData.domain || 'google.com'}?c=${BRANDFETCH_CLIENT_ID}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 border border-slate-200 dark:border-[#333333]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-[#333333] bg-gray-50 dark:bg-[#2d2d2d] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white dark:bg-[#1e1e1e] rounded-xl border border-slate-200 dark:border-[#444] p-2">
                <img 
                    src={currentLogoUrl} 
                    className="w-full h-full object-contain" 
                    alt="" 
                    onError={(e) => { e.currentTarget.src = FALLBACK_LOGO; }}
                />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Enrich: {formData.name}</h2>
              <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Admin Overrides</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-[#444] rounded-full text-slate-400 transition-colors"><X size={20}/></button>
        </div>

        <div className="p-8 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Company Name */}
            <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Company Name</label>
                <div className="relative">
                    <Building2 className="absolute left-3 top-3 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#2d2d2d] border border-slate-200 dark:border-[#333333] rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm dark:text-white"
                    />
                </div>
            </div>

            {/* Industry */}
            <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Industry</label>
                <div className="relative">
                    <Globe className="absolute left-3 top-3 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        value={formData.industry}
                        onChange={(e) => setFormData({...formData, industry: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#2d2d2d] border border-slate-200 dark:border-[#333333] rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm dark:text-white"
                    />
                </div>
            </div>

            {/* Location */}
            <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Location</label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#2d2d2d] border border-slate-200 dark:border-[#333333] rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm dark:text-white"
                    />
                </div>
            </div>

            {/* Logo URL / Domain */}
            <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Domain (for logo retrieval)</label>
                <div className="relative">
                    <Globe className="absolute left-3 top-3 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        value={formData.domain}
                        placeholder="e.g. vodafone.com.eg"
                        onChange={(e) => {
                            const dom = e.target.value;
                            setFormData({
                                ...formData, 
                                domain: dom,
                                logoUrl: `https://cdn.brandfetch.io/domain/${dom}?c=${BRANDFETCH_CLIENT_ID}`
                            });
                        }}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#2d2d2d] border border-slate-200 dark:border-[#333333] rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm dark:text-white"
                    />
                </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Description</label>
              <div className="relative">
                  <FileText className="absolute left-3 top-3 text-slate-400" size={16} />
                  <textarea 
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#2d2d2d] border border-slate-200 dark:border-[#333333] rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm dark:text-white"
                  />
              </div>
          </div>

          {/* Verification Toggle */}
          <div className="mt-8 flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-600 rounded-lg text-white">
                    <ShieldCheck size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-black text-indigo-900 dark:text-indigo-300">Verified Partner</h4>
                    <p className="text-[10px] text-indigo-700 dark:text-indigo-400">Apply the official ProConnect verification badge.</p>
                </div>
            </div>
            <button 
                onClick={() => setFormData({...formData, isVerified: !formData.isVerified})}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${formData.isVerified ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'}`}
            >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${formData.isVerified ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Claim Status Indicator (Read Only) */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-[#2d2d2d] flex items-center gap-3">
              <CheckCircle2 className={formData.isClaimed ? "text-green-500" : "text-slate-300"} size={20} />
              <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Claim Status: {formData.isClaimed ? 'Claimed' : 'Unclaimed'}</h4>
                  <p className="text-[10px] text-slate-500">{formData.isClaimed ? 'A company admin is managing this profile.' : 'Available for corporate registration.'}</p>
              </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 dark:border-[#333333] bg-gray-50 dark:bg-[#2d2d2d] flex gap-4">
            <button 
                onClick={onClose}
                className="flex-1 py-4 text-slate-500 dark:text-slate-400 font-black uppercase text-[11px] tracking-widest hover:bg-slate-200 dark:hover:bg-[#444] rounded-2xl transition-colors"
            >
                Discard Changes
            </button>
            <button 
                onClick={handleSave}
                className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-[11px] tracking-widest rounded-2xl shadow-xl shadow-indigo-100 dark:shadow-none flex items-center justify-center gap-2 transition-all active:scale-95"
            >
                <Save size={16} /> Save Enrichment
            </button>
        </div>
      </div>
    </div>
  );
};