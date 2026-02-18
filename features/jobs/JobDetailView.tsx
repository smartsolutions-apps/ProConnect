import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Building2, CheckCircle2, MapPin, Timer, ArrowRight, Share2, DollarSign, Globe } from 'lucide-react';
import { CompanyLogo } from '../../components/ui/CompanyLogo';
import { useHydratedData } from '../../context/DataHydrationContext';
import { Job } from '../../types';

interface JobDetailViewProps {
    job: Job | null;
    onApply: (job: Job) => void;
    userLocation?: any;
}

export const JobDetailView: React.FC<JobDetailViewProps> = ({ job, onApply, userLocation }) => {
    const { companies } = useHydratedData();
    const navigate = useNavigate();
    const { lang = 'en' } = useParams<{ lang: string }>();

    if (!job) {
        // ... existing empty state
        return (
            <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl p-12 text-center border border-slate-200 dark:border-[#2c2c2c] h-[calc(100vh-140px)] flex flex-col justify-center items-center sticky top-24">
                <div className="w-24 h-24 bg-slate-50 dark:bg-[#252525] rounded-full flex items-center justify-center mb-6">
                    <Building2 size={40} className="text-slate-300 dark:text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Select a job to view details</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                    Click on any job card from the list on the left to see the full description and requirements.
                </p>
            </div>
        );
    }

    // Resolve company data
    const company = companies.find(c => c.id === job.companyId || c.name === job.companyName);
    const domain = company?.domain || job.companyName.toLowerCase().replace(/\s/g, '') + '.com';
    const companySlug = company?.slug || job.companyId;

    const handleCompanyClick = () => {
        navigate(`/${lang}/companies/${companySlug}`);
    };

    const isDirectOffer = job.isDirectOffer;

    return (
        <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl border border-slate-200 dark:border-[#2c2c2c] overflow-hidden sticky top-24 h-[calc(100vh-140px)] flex flex-col">
            {/* Header Image / Pattern */}
            <div className="h-32 bg-gradient-to-r from-slate-100 to-blue-50 dark:from-[#252525] dark:to-[#1e1e1e] relative">
                {isDirectOffer && (
                    <div className="absolute top-4 right-4 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider border border-amber-200 dark:border-amber-800 z-10">
                        Direct Offer
                    </div>
                )}
            </div>

            {/* Main Content Scrollable Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="px-8 pb-8 -mt-12 relative">
                    {/* Logo */}
                    <div
                        onClick={handleCompanyClick}
                        className="w-24 h-24 rounded-2xl border-4 border-white dark:border-[#1e1e1e] overflow-hidden bg-white dark:bg-[#2d2d2d] shadow-md p-2 flex items-center justify-center mb-4 cursor-pointer hover:scale-105 transition-transform"
                    >
                        <CompanyLogo
                            companyName={job.companyName}
                            domain={domain}
                            sizeClass="w-full h-full"
                        />
                    </div>

                    {/* Title Block */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-tight mb-2">
                            {job.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <span
                                onClick={handleCompanyClick}
                                className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                            >
                                {job.companyName}
                                {job.isEasyApply && <CheckCircle2 size={14} className="text-blue-500" />}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <MapPin size={14} /> {job.location}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Timer size={14} /> {job.postedAt}
                            </span>
                        </div>
                    </div>

                    {/* Action Bar (Top) */}
                    <div className="flex gap-3 mb-8 pb-8 border-b border-slate-100 dark:border-[#2c2c2c]">
                        <button
                            onClick={() => onApply(job)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            {isDirectOffer ? 'Claim Offer' : 'Apply Now'}
                            <ArrowRight size={18} />
                        </button>
                        <button className="px-4 py-3 border border-slate-200 dark:border-[#333333] rounded-xl hover:bg-slate-50 dark:hover:bg-[#2d2d2d] transition-colors font-medium text-slate-600 dark:text-slate-300">
                            Save
                        </button>
                        <button
                            onClick={() => {
                                const url = `${window.location.origin}/${lang}/job/${job.slug}`;
                                navigator.clipboard.writeText(url);
                                alert('Link copied to clipboard: ' + url); // Simple feedback
                            }}
                            className="px-4 py-3 border border-slate-200 dark:border-[#333333] rounded-xl hover:bg-slate-50 dark:hover:bg-[#2d2d2d] transition-colors font-medium text-slate-600 dark:text-slate-300"
                            title="Copy Shareable Link"
                        >
                            <Share2 size={20} />
                        </button>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#252525] border border-slate-100 dark:border-[#2c2c2c]">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Job Type</div>
                            <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <Building2 size={16} /> {job.type}
                            </div>
                        </div>
                        {job.salaryRange && (
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20">
                                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">Salary</div>
                                <div className="font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                                    <DollarSign size={16} /> {job.salaryRange}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">About the job</h3>
                            <div className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                                {job.description}
                            </div>
                        </div>

                        {/* Mock Requirements */}
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Requirements</h3>
                            <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                                <li>Proven experience in the Egyptian real estate market.</li>
                                <li>Strong communication and negotiation skills.</li>
                                <li>Ability to work independently and as part of a team.</li>
                                <li>Familiarity with CRM tools and real estate platforms.</li>
                            </ul>
                        </div>

                        {/* Company Section */}
                        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-[#2c2c2c]">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">About {job.companyName}</h3>
                            <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-100 dark:border-[#333333] bg-slate-50/50 dark:bg-[#252525]/50">
                                <div
                                    onClick={handleCompanyClick}
                                    className="w-16 h-16 rounded-xl border border-slate-200 dark:border-[#444] bg-white dark:bg-[#333] overflow-hidden flex-shrink-0 p-2 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                                >
                                    <CompanyLogo
                                        companyName={job.companyName}
                                        domain={domain}
                                        sizeClass="w-full h-full"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4
                                        onClick={handleCompanyClick}
                                        className="font-bold text-slate-900 dark:text-white cursor-pointer hover:underline hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                        {job.companyName}
                                    </h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-3">
                                        {company?.industry || 'Real Estate'} • {company?.location || 'Cairo, Egypt'}
                                    </p>
                                    {company?.description && (
                                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{company.description}</p>
                                    )}
                                    <a
                                        href={`https://${domain}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
                                    >
                                        Visit Website <Globe size={14} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer Actions (Sticky) */}
            <div className="p-4 bg-white dark:bg-[#1e1e1e] border-t border-slate-100 dark:border-[#2c2c2c]">
                <button
                    onClick={() => onApply(job)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                    {isDirectOffer ? 'Claim Offer' : 'Apply Now'}
                </button>
            </div>
        </div>
    );
};
