
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHydratedData } from '../../context/DataHydrationContext';
import { JobCard } from '../jobs/JobCard';
import { CompanySocialGrid } from './CompanySocialGrid';
import { CompanyLogo } from '../../components/ui/CompanyLogo';
import { Building2, MapPin, Users, Globe, ArrowLeft, CheckCircle2, UserPlus, Flag } from 'lucide-react';
import { CURRENT_USER } from '../../data';
import { ReportModal } from '../moderation/ReportModal';

const BRANDFETCH_CLIENT_ID = "1idiSqP5yegNdsQZndZ";
const FALLBACK_LOGO = "https://ui-avatars.com/api/?name=Company&background=0D8ABC&color=fff&rounded=true&bold=true";

export const CompanyProfileView: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { companies, jobs } = useHydratedData();
    const [activeTab, setActiveTab] = useState<'home' | 'about' | 'jobs' | 'social'>('home');
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    const company = companies.find(c => c.slug === slug);
    const companyJobs = jobs.filter(j => j.companyId === company?.id);

    // Soft Delete Check
    if (!company || company.isHidden) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Company Not Found</h1>
                    <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline">Go Back</button>
                </div>
            </div>
        );
    }

    const domain = company.domain || company.name.toLowerCase().replace(/\s/g, '') + '.com';
    const logoUrl = `https://cdn.brandfetch.io/domain/${domain}?c=${BRANDFETCH_CLIENT_ID}`;

    // Mock Data for "About" if missing
    const employeeCount = "501-1,000 employees";
    const locations = ["Cairo, Egypt", "Dubai, UAE", "Riyadh, Saudi Arabia"];
    const detailedDesc = company.description && company.description.length > 50
        ? company.description
        : `${company.name} is a leading player in the ${company.industry} sector, committed to delivering excellence and innovation in the Egyptian market. We pride ourselves on our dedicated team and our customer-centric approach.`;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#121212] transition-colors duration-300">

            {/* Header Area */}
            <div className="bg-white dark:bg-[#1e1e1e] border-b border-gray-200 dark:border-[#2c2c2c]">
                <div className="max-w-5xl mx-auto">
                    {/* Profile Info */}
                    <div className="px-6 py-6 relative">
                        <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
                            <ArrowLeft size={18} /> Back to jobs
                        </button>
                        <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 rounded-2xl border border-slate-200 bg-white shadow-sm flex-shrink-0 p-2">
                                    <CompanyLogo companyName={company.name} domain={domain} sizeClass="w-full h-full rounded-xl" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                                        {company.name}
                                        <CheckCircle2 size={20} className="text-blue-500" fill="currentColor" color="white" />
                                    </h1>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">{company.industry} • {company.location || 'Cairo, Egypt'}</p>
                                    <p className="text-sm text-gray-400 dark:text-gray-500 font-bold mt-1">12,450 followers</p>
                                </div>
                            </div>
                            <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
                                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm">
                                    <UserPlus size={18} /> Follow
                                </button>
                                <button
                                    onClick={() => setIsReportModalOpen(true)}
                                    className="px-3 py-2 border border-slate-200 dark:border-[#444] hover:bg-red-50 dark:hover:bg-red-900/10 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-full transition-colors"
                                    title="Report this company"
                                >
                                    <Flag size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Tab Navigation (Sticky) */}
                        <div className="flex overflow-x-auto border-t border-gray-100 dark:border-[#2c2c2c] pt-2 hide-scrollbar">
                            {[
                                { id: 'home', label: 'Home' },
                                { id: 'about', label: 'About' },
                                { id: 'jobs', label: 'Jobs' },
                                { id: 'social', label: 'Social Pulse' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                        ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            {/* Content Area */}
            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* Main Column */}
                    <div className="md:col-span-8 space-y-6">

                        {/* HOME TAB */}
                        {activeTab === 'home' && (
                            <>
                                <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 border border-gray-200 dark:border-[#2c2c2c] shadow-sm">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About</h2>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed overflow-hidden line-clamp-4">
                                        {detailedDesc}
                                    </p>
                                    <button
                                        onClick={() => setActiveTab('about')}
                                        className="mt-2 text-sm font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        See all details
                                    </button>
                                </div>

                                <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 border border-gray-200 dark:border-[#2c2c2c] shadow-sm">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recently Posted Jobs</h2>
                                    <div className="space-y-4">
                                        {companyJobs.slice(0, 2).map(job => (
                                            <JobCard key={job.id} job={job} userLocation={CURRENT_USER.location} onApply={() => { }} />
                                        ))}
                                        {companyJobs.length === 0 && (
                                            <p className="text-gray-500 italic">No active job listings at the moment.</p>
                                        )}
                                    </div>
                                    {companyJobs.length > 2 && (
                                        <button
                                            onClick={() => setActiveTab('jobs')}
                                            className="w-full mt-4 py-2 border border-gray-200 dark:border-[#333] rounded-lg font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#252525]"
                                        >
                                            Show all {companyJobs.length} jobs
                                        </button>
                                    )}
                                </div>
                            </>
                        )}

                        {/* ABOUT TAB */}
                        {activeTab === 'about' && (
                            <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-8 border border-gray-200 dark:border-[#2c2c2c] shadow-sm">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Overview</h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 whitespace-pre-line">
                                    {detailedDesc}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Website</h4>
                                        <a href={`https://${domain}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                                            {domain} <Globe size={12} />
                                        </a>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Industry</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{company.industry}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Company size</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{employeeCount}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Headquarters</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{company.location || 'Cairo, Egypt'}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Locations</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{locations.join(', ')}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* JOBS TAB */}
                        {activeTab === 'jobs' && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Open Positions</h2>
                                {companyJobs.length > 0 ? (
                                    companyJobs.map(job => (
                                        <JobCard key={job.id} job={job} userLocation={CURRENT_USER.location} onApply={() => { }} />
                                    ))
                                ) : (
                                    <div className="text-center py-12 bg-white dark:bg-[#1e1e1e] rounded-xl border border-gray-200 dark:border-[#2c2c2c]">
                                        <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-500">No open positions at this time.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* SOCIAL PULSE TAB */}
                        {activeTab === 'social' && (
                            <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 border border-gray-200 dark:border-[#2c2c2c] shadow-sm">
                                <CompanySocialGrid company={company} />
                            </div>
                        )}

                    </div>

                    {/* Sidebar Column */}
                    <div className="md:col-span-4 space-y-6">
                        {/* Pages People Also Viewed (Mock) */}
                        <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 border border-gray-200 dark:border-[#2c2c2c] shadow-sm sticky top-24">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Pages people also viewed</h3>
                            <div className="space-y-4">
                                {companies.filter(c => c.id !== company.id && c.industry === company.industry).slice(0, 4).map(c => (
                                    <div key={c.id} className="flex items-start gap-3">
                                        <CompanyLogo
                                            companyName={c.name}
                                            domain={c.domain || c.name.toLowerCase().replace(/\s/g, '') + '.com'}
                                            sizeClass="w-10 h-10"
                                            className="rounded-md border border-gray-100 bg-white"
                                        />
                                        <div>
                                            <h4 className="font-bold text-sm text-gray-900 dark:text-white hover:underline cursor-pointer" onClick={() => navigate(`/en/companies/${c.slug}`)}>
                                                {c.name}
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{c.industry}</p>
                                            <button className="mt-1 text-xs font-bold text-gray-500 border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-[#252525]">
                                                + Follow
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ReportModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                entityId={company.id}
                entityType="company"
                entityTitle={company.name}
            />
        </div>
    );
};
