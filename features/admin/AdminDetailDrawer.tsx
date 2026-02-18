import React from 'react';
import { X, MapPin, Users, Briefcase, Calendar, Ban, CheckCircle2, PauseCircle, Trash2 } from 'lucide-react';
import { OmniResult } from '../../hooks/useOmniSearch';
import { CompanyLogo } from '../../components/ui/CompanyLogo';

interface AdminDetailDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    entity: OmniResult | null;
}

export const AdminDetailDrawer: React.FC<AdminDetailDrawerProps> = ({ isOpen, onClose, entity }) => {
    if (!entity) return null;

    const isJob = entity.type === 'job';
    const isCompany = entity.type === 'company';
    const isUser = entity.type === 'user';
    const data = entity.data;

    // Mock Applicants for Jobs
    const mockApplicants = [
        { id: 1, name: 'Ahmed Hassan', role: 'Senior Frontend Dev', avatar: 'https://i.pravatar.cc/150?u=1' },
        { id: 2, name: 'Sarah Nabil', role: 'UI/UX Designer', avatar: 'https://i.pravatar.cc/150?u=2' },
        { id: 3, name: 'Mohamed Ali', role: 'Full Stack Engineer', avatar: 'https://i.pravatar.cc/150?u=3' },
    ];

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div className={`fixed inset-y-0 right-0 w-full md:w-[480px] bg-white dark:bg-[#1e1e1e] shadow-2xl z-[101] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>

                {/* Header */}
                <div className="p-6 border-b border-slate-100 dark:border-[#333] flex items-start justify-between bg-slate-50/50 dark:bg-[#252525]">
                    <div className="flex items-center gap-4">
                        <CompanyLogo
                            companyName={entity.title}
                            domain={(data as any).domain}
                            sizeClass="w-16 h-16"
                            className="shadow-sm border border-slate-200 dark:border-[#444]"
                        />
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1">{entity.title}</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                                {entity.subtitle}
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${entity.type === 'job' ? 'bg-blue-100 text-blue-700' :
                                        entity.type === 'company' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'
                                    }`}>
                                    {entity.type}
                                </span>
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">

                    {/* Job Details */}
                    {isJob && (
                        <>
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                                    <Briefcase size={16} /> Job Details
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-slate-50 dark:bg-[#252525] rounded-lg">
                                        <p className="text-xs text-slate-500 mb-1">Location</p>
                                        <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">{(data as any).location || 'Remote'}</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 dark:bg-[#252525] rounded-lg">
                                        <p className="text-xs text-slate-500 mb-1">Posted</p>
                                        <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">{(data as any).postedAt || 'Recently'}</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 dark:bg-[#252525] rounded-lg">
                                        <p className="text-xs text-slate-500 mb-1">Type</p>
                                        <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">{(data as any).type || 'Full Time'}</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 dark:bg-[#252525] rounded-lg">
                                        <p className="text-xs text-slate-500 mb-1">Salary</p>
                                        <p className="font-semibold text-sm text-emerald-600">{(data as any).salaryRange || 'Competitive'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                                    <Users size={16} /> Applicants ({mockApplicants.length})
                                </h3>
                                <div className="space-y-3">
                                    {mockApplicants.map(applicant => (
                                        <div key={applicant.id} className="flex items-center justify-between p-3 bg-white dark:bg-[#1e1e1e] border border-slate-100 dark:border-[#333] rounded-xl hover:border-blue-200 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <img src={applicant.avatar} alt={applicant.name} className="w-8 h-8 rounded-full" />
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{applicant.name}</p>
                                                    <p className="text-xs text-slate-500">{applicant.role}</p>
                                                </div>
                                            </div>
                                            <button className="p-1.5 text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors" title="Remove Applicant">
                                                <Ban size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Job Actions */}
                            <div className="pt-4 border-t border-slate-100 dark:border-[#333]">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Listing Status</span>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-amber-200 transition-colors">
                                        <PauseCircle size={16} /> Pause Listing
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Company Details */}
                    {isCompany && (
                        <div className="space-y-6">
                            <div className="p-4 bg-slate-50 dark:bg-[#252525] rounded-xl border border-slate-100 dark:border-[#333]">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-2">About</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {(data as any).description || 'No description available for this company.'}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 border border-slate-100 dark:border-[#333] rounded-lg">
                                    <p className="text-xs text-slate-500 mb-1">Industry</p>
                                    <p className="font-semibold text-slate-900 dark:text-white">{(data as any).industry}</p>
                                </div>
                                <div className="p-3 border border-slate-100 dark:border-[#333] rounded-lg">
                                    <p className="text-xs text-slate-500 mb-1">Employees</p>
                                    <p className="font-semibold text-slate-900 dark:text-white">{(data as any).employeeCount || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-slate-100 dark:border-[#333] bg-slate-50/50 dark:bg-[#252525] flex gap-3">
                    <button className="flex-1 py-3 bg-white dark:bg-[#333] border border-slate-200 dark:border-[#444] text-slate-700 dark:text-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                        Edit Entity
                    </button>
                    <button className="flex-1 py-3 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-xl font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                        <Trash2 size={18} /> Delete
                    </button>
                </div>

            </div>
        </>
    );
};
