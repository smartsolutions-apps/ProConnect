
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Building2, Timer, CheckCircle2, ArrowRight, Share2, Globe, Users, Flag } from 'lucide-react';
import { useHydratedData } from '../../context/DataHydrationContext';
import { ReportModal } from '../moderation/ReportModal';
import { canUserApply, incrementUserApplyCount, getRemainingUserApplies } from '../../utils/rateLimits';

const BRANDFETCH_CLIENT_ID = "1idiSqP5yegNdsQZndZ";
const FALLBACK_LOGO = "https://ui-avatars.com/api/?name=Real+Estate&background=0D8ABC&color=fff&rounded=true&bold=true";

export const JobStandaloneView: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { jobs, companies } = useHydratedData();
    const navigate = useNavigate();
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [applyError, setApplyError] = useState<string | null>(null);

    // Find Job by Slug
    const job = jobs.find(j => j.slug === slug);

    if (!job) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-[#121212] flex flex-col items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Job Not Found</h1>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">The job you are looking for might have been removed or the link is expired.</p>
                    <button
                        onClick={() => navigate('/en/jobs')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition"
                    >
                        Browse All Jobs
                    </button>
                </div>
            </div>
        );
    }

    // Resolve Company Data
    const company = companies.find(c => c.id === job.companyId || c.name === job.companyName);
    const domain = company?.domain || job.companyName.toLowerCase().replace(/\s/g, '') + '.com';
    const logoUrl = `https://cdn.brandfetch.io/domain/${domain}?c=${BRANDFETCH_CLIENT_ID}`;
    const companySlug = company?.slug || job.companyId;

    const handleApply = () => {
        if (canUserApply()) {
            incrementUserApplyCount();
            // In a real app, this would open the apply modal or redirect
            alert(`Application started! You have ${getRemainingUserApplies()} applications left today.`);
        } else {
            // Force re-render to show disabled state if not already
            setApplyError("Daily limit reached");
        }
    };

    const isApplyDisabled = !canUserApply();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#121212] pb-20">
            {/* Header / Nav Placeholder (could be global header) */}
            <div className="bg-white dark:bg-[#1e1e1e] border-b border-slate-200 dark:border-[#333] px-4 py-3 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <div
                        onClick={() => navigate('/en/jobs')}
                        className="font-black text-xl tracking-tighter cursor-pointer text-slate-900 dark:text-white"
                    >
                        ProConnect
                    </div>
                </div>
            </div>

            <main className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Main Column (Job Details) */}
                <div className="md:col-span-2 space-y-4">

                    {/* Top Card */}
                    <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl p-6 border border-slate-200 dark:border-[#333] shadow-sm">
                        <div className="flex justify-between items-start">
                            <div className="w-16 h-16 rounded-xl border border-slate-100 dark:border-[#333] mb-4 overflow-hidden bg-white p-2 flex items-center justify-center">
                                <img src={logoUrl} alt={job.companyName} className="w-full h-full object-contain" onError={(e) => e.currentTarget.src = FALLBACK_LOGO} />
                            </div>
                            <button
                                onClick={() => setIsReportModalOpen(true)}
                                className="text-slate-400 hover:text-red-500 transition-colors p-2"
                                title="Report this job"
                            >
                                <Flag size={18} />
                            </button>
                        </div>

                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{job.title}</h1>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
                            <span className="font-semibold text-slate-900 dark:text-white hover:underline cursor-pointer" onClick={() => navigate(`/en/companies/${companySlug}`)}>
                                {job.companyName}
                            </span>
                            <span>•</span>
                            <span>{job.location}</span>
                            <span>•</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium">{job.postedAt}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-slate-500">
                                <Users size={14} /> {job.applicantsCount} applicants
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="px-3 py-1 bg-slate-100 dark:bg-[#2d2d2d] rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                                <Building2 size={12} /> {job.type}
                            </span>
                            {job.salaryRange && (
                                <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-full text-xs font-bold text-emerald-700 dark:text-emerald-400">
                                    {job.salaryRange}
                                </span>
                            )}
                            {job.isEasyApply && (
                                <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full text-xs font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1">
                                    <CheckCircle2 size={12} /> Easy Apply
                                </span>
                            )}
                        </div>

                        <div className="flex gap-3 flex-col sm:flex-row">
                            <button
                                onClick={handleApply}
                                disabled={isApplyDisabled}
                                className={`flex-1 font-bold py-2.5 rounded-full transition-colors flex items-center justify-center gap-2
                                    ${isApplyDisabled
                                        ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                            >
                                {isApplyDisabled ? 'Daily Application Limit Reached (5/5)' : 'Apply Now'}
                                {!isApplyDisabled && <ArrowRight size={16} />}
                            </button>
                            <button className="px-4 py-2.5 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-full font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                Save
                            </button>
                        </div>
                        {isApplyDisabled && (
                            <p className="text-xs text-red-500 mt-2 text-center sm:text-left">
                                You have reached your daily application limit of 5. Please try again tomorrow. Choose your applications carefully!
                            </p>
                        )}
                    </div>

                    {/* Description Card */}
                    <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl p-6 border border-slate-200 dark:border-[#333] shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">About the job</h2>
                        <div className="prose dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                            {job.description}
                        </div>

                        {/* Mock Qualifications since generic job type doesn't have it structured */}
                        <h3 className="text-md font-bold text-slate-900 dark:text-white mt-6 mb-3">Qualifications</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
                            <li>Minimum 7-10 years experience in reputable Real Estate Developer.</li>
                            <li>Bachelor's degree in Business Admin or related field.</li>
                            <li>Excellent communication and leadership skills.</li>
                        </ul>
                    </div>

                </div>

                {/* Sidebar (Company Info) */}
                <div className="space-y-4">
                    <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl p-6 border border-slate-200 dark:border-[#333] shadow-sm sticky top-24">
                        <h2 className="text-md font-bold text-slate-900 dark:text-white mb-4">About the company</h2>

                        <div className="flex items-center gap-4 mb-4">
                            <div
                                onClick={() => navigate(`/en/companies/${companySlug}`)}
                                className="w-14 h-14 rounded-lg border border-slate-100 dark:border-[#333] overflow-hidden bg-white p-1 flex items-center justify-center cursor-pointer"
                            >
                                <img src={logoUrl} alt={job.companyName} className="w-full h-full object-contain" onError={(e) => e.currentTarget.src = FALLBACK_LOGO} />
                            </div>
                            <div>
                                <h3
                                    onClick={() => navigate(`/en/companies/${companySlug}`)}
                                    className="font-bold text-slate-900 dark:text-white cursor-pointer hover:underline"
                                >
                                    {job.companyName}
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{company?.followerCount || '200K+ followers'}</p>
                            </div>
                        </div>

                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-4">
                            {company?.description}
                        </p>

                        <div className="space-y-3">
                            <button className="w-full py-2 border border-slate-300 dark:border-slate-600 rounded-full font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#2d2d2d] transition text-sm">
                                + Follow
                            </button>
                            {company?.domain && (
                                <a
                                    href={`https://${company.domain}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-2 text-blue-600 dark:text-blue-400 font-bold text-sm hover:underline"
                                >
                                    Visit website <Globe size={14} />
                                </a>
                            )}
                        </div>

                    </div>
                </div>

            </main>

            <ReportModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                entityId={job.id}
                entityType="job"
                entityTitle={job.title}
            />
        </div>
    );
};
