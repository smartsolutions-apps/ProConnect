import React, { useState } from 'react';
import { Header } from '../../components/layout/Header'; // Assuming this location, will verify
import { Building2, FileText, User, Save, UploadCloud, Users, ChevronRight, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useHydratedData } from '../../context/DataHydrationContext';
import { DataTable, Column } from '../../components/common/DataTable'; // Assuming DataTable exists
import { Company, Job, User as UserType } from '../../types';
import { PostJobForm } from './components/PostJobForm';

export const RecruiterDashboard: React.FC = () => {
    const { user } = useAuth();
    const { companies, jobs } = useHydratedData();
    const [activeTab, setActiveTab] = useState<'profile' | 'jobs' | 'post-job' | 'applicants'>('profile');

    // MOCK: In a real app, we'd find the company by user.companyId
    // For now, let's assume the user IS relevant to the first company or we mock it.
    const myCompany = companies[0] || {
        id: 'mock-co',
        name: 'Mock Company',
        industry: 'Technology',
        description: 'A great place to work.',
        location: 'Cairo, Egypt',
        website: 'https://example.com',
        isVerified: true
    };

    const myJobs = jobs.filter(j => j.companyId === myCompany.id || j.companyName === myCompany.name);
    if (myJobs.length === 0 && jobs.length > 0) {
        // Fallback for demo if no matching jobs found
        // myJobs.push(...jobs.slice(0, 3)); 
    }

    // --- Profile Tab ---
    const [companyForm, setCompanyForm] = useState(myCompany);
    const handleProfileSave = () => {
        alert("Profile changes saved (Mock)!");
    };

    // --- Jobs Tab ---
    const jobColumns: Column<Job>[] = [
        { header: "Job Title", accessor: (j) => <span className="font-bold text-gray-900">{j.title}</span> },
        { header: "Type", accessor: (j) => j.type },
        { header: "Location", accessor: (j) => j.location },
        { header: "Applicants", accessor: (j) => <span className="font-mono text-blue-600">{j.applicantsCount || 0}</span> },
        { header: "Status", accessor: () => <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Active</span> }
    ];

    // --- Applicants Tab ---
    // Mock applicants
    const MOCK_APPLICANTS = [
        { id: 1, name: "Ahmed Ali", role: "Frontend Developer", appliedFor: "Senior React Engineer", date: "2024-02-14" },
        { id: 2, name: "Sara Mahmoud", role: "Product Manager", appliedFor: "Product Lead", date: "2024-02-13" },
        { id: 3, name: "Omar Sherif", role: "UX Designer", appliedFor: "Senior UX Designer", date: "2024-02-12" },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Reusing standard Header but forcing 'recruiter' context if needed by props? 
           For now assuming Header handles user role display internally. 
       */}
            <Header
                user={user as any}
                activeTab={activeTab === 'profile' ? 'profile' : 'jobs'}
                setActiveTab={() => { }}
                isStealthMode={false}
                toggleStealthMode={() => { }}
            />

            <main className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    {/* Sidebar Navigation */}
                    <div className="col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                            <div className="p-4 bg-slate-900 text-white">
                                <h3 className="font-bold text-lg">{myCompany.name}</h3>
                                <p className="text-xs text-gray-400">Recruiter Portal</p>
                            </div>
                            <nav className="p-2 space-y-1">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`w-full flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <Building2 size={18} /> Company Profile
                                </button>
                                <button
                                    onClick={() => setActiveTab('jobs')}
                                    className={`w-full flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'jobs' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <Briefcase size={18} /> Manage Jobs
                                </button>
                                <button
                                    onClick={() => setActiveTab('applicants')}
                                    className={`w-full flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'applicants' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <Users size={18} /> Applicants
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="col-span-3 space-y-6">

                        {/* 1. PROFILE TAB */}
                        {activeTab === 'profile' && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Building2 className="text-blue-600" /> Edit Company Profile
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-6 mb-6 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                        <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center border border-gray-200 shadow-sm">
                                            <img src={myCompany.logoUrl || "https://ui-avatars.com/api/?name=Company"} alt="Logo" className="w-16 h-16 object-contain" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-gray-900">Company Logo</h4>
                                            <p className="text-xs text-gray-500 mb-3">Recommended: 400x400px, PNG or JPG</p>
                                            <button className="px-3 py-1.5 bg-white border border-gray-300 text-xs font-bold rounded-lg hover:bg-gray-50 flex items-center gap-2">
                                                <UploadCloud size={14} /> Upload New
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Company Name</label>
                                            <input
                                                type="text"
                                                value={companyForm.name}
                                                onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                                                className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Industry</label>
                                            <input
                                                type="text"
                                                value={companyForm.industry}
                                                onChange={(e) => setCompanyForm({ ...companyForm, industry: e.target.value })}
                                                className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                                        <textarea
                                            value={companyForm.description}
                                            onChange={(e) => setCompanyForm({ ...companyForm, description: e.target.value })}
                                            rows={4}
                                            className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                                        />
                                    </div>

                                    <div className="pt-4 flex justify-end">
                                        <button
                                            onClick={handleProfileSave}
                                            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 flex items-center gap-2"
                                        >
                                            <Save size={18} /> Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2. JOBS TAB */}
                        {activeTab === 'jobs' && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">Manage Jobs</h2>
                                        <p className="text-sm text-gray-500">You have {myJobs.length} active job listings.</p>
                                    </div>
                                    <button
                                        onClick={() => setActiveTab('post-job')}
                                        className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg text-sm hover:bg-blue-700"
                                    >
                                        + Post New Job
                                    </button>
                                </div>

                                {myJobs.length > 0 ? (
                                    <DataTable data={myJobs} columns={jobColumns} searchPlaceholder="Search your jobs..." />
                                ) : (
                                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed">
                                        <Briefcase className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                                        <h3 className="text-lg font-medium text-gray-900">No jobs posted yet</h3>
                                        <p className="text-gray-500 mb-4">Get started by creating your first job listing.</p>
                                        <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg text-sm">
                                            Create Job
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 3. POST JOB TAB */}
                        {activeTab === 'post-job' && (
                            <div className="animate-in fade-in zoom-in duration-300">
                                <div className="mb-4">
                                    <button
                                        onClick={() => setActiveTab('jobs')}
                                        className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1"
                                    >
                                        <ChevronRight className="rotate-180 w-4 h-4" /> Back to Jobs
                                    </button>
                                </div>
                                <PostJobForm onSuccess={() => setActiveTab('jobs')} />
                            </div>
                        )}

                        {/* 4. APPLICANTS TAB */}
                        {activeTab === 'applicants' && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Users className="text-purple-600" /> Recent Applicants
                                </h2>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider">
                                                <th className="pb-3 font-bold">Candidate</th>
                                                <th className="pb-3 font-bold">Applied For</th>
                                                <th className="pb-3 font-bold">Date</th>
                                                <th className="pb-3 font-bold text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            {MOCK_APPLICANTS.map(app => (
                                                <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                                    <td className="py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs">
                                                                {app.name.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-900">{app.name}</p>
                                                                <p className="text-xs text-gray-500">{app.role}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 text-gray-700">{app.appliedFor}</td>
                                                    <td className="py-4 text-gray-500">{app.date}</td>
                                                    <td className="py-4 text-right">
                                                        <button className="text-blue-600 hover:text-blue-800 font-bold text-xs">View CV</button>
                                                        <span className="mx-2 text-gray-300">|</span>
                                                        <button className="text-gray-500 hover:text-gray-700 font-bold text-xs">Message</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
};
