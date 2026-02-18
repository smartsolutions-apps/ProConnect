import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Briefcase, MapPin, DollarSign, FileText, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { JobType } from '../../../types';
import { generateJobTemplate } from '../../../services/api/geminiService';

export const PostJobForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        location: '',
        employmentType: 'Full-time',
        salaryRange: '',
        description: '',
        requirements: ''
    });

    const generateCleanId = (text: string) =>
        text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '').substring(0, 40) + '-' + Date.now();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAutoGenerate = async () => {
        if (!formData.title) {
            setError('Please enter a Job Title first to use AI generation.');
            return;
        }

        setIsGenerating(true);
        setError('');

        try {
            const template = await generateJobTemplate(formData.title);
            setFormData(prev => ({
                ...prev,
                description: template.description,
                requirements: template.requirements
            }));
        } catch (err) {
            console.error("Auto-generate failed:", err);
            setError('Failed to generate content. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess(false);

        try {
            const jobId = generateCleanId(formData.title);

            // Combine description and requirements for the single description field in Job interface
            // or we could keep them separate if we extended the type, but purely following instructions/types:
            const fullDescription = `${formData.description}\n\n### Requirements\n${formData.requirements}`;

            const newJob = {
                id: jobId,
                slug: jobId, // Using ID as slug for simplicity/uniqueness
                title: formData.title,
                companyId: 'proconnect-hq',
                companyName: 'ProConnect',
                companyLogo: 'https://ui-avatars.com/api/?name=Pro+Connect&background=0D8ABC&color=fff',
                location: formData.location,
                type: formData.employmentType as JobType,
                postedAt: new Date().toISOString(),
                description: fullDescription,
                applicantsCount: 0,
                salaryRange: formData.salaryRange,
                isEasyApply: true, // Defaulting to true for now
                isDirectOffer: false
            };

            await setDoc(doc(db, 'jobs', jobId), newJob);

            setSuccess(true);
            setFormData({
                title: '',
                location: '',
                employmentType: 'Full-time',
                salaryRange: '',
                description: '',
                requirements: ''
            });

            if (onSuccess) {
                setTimeout(onSuccess, 2000); // Navigate back after delay
            }

        } catch (err: any) {
            console.error("Error posting job:", err);
            setError(err.message || 'Failed to post job. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="text-green-600 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Job Posted Successfully!</h3>
                <p className="text-green-600">Your job listing is now live. Redirecting...</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl mx-auto">
            <div className="mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Briefcase className="text-blue-600" /> Post a New Job
                </h2>
                <p className="text-sm text-gray-500 mt-1">Create a compelling job post to attract top talent.</p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="text-red-500 w-5 h-5 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Title */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-bold text-gray-700">Job Title</label>
                        <button
                            type="button"
                            onClick={handleAutoGenerate}
                            disabled={isGenerating || !formData.title}
                            className="text-xs flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles size={14} />}
                            {isGenerating ? 'Writing...' : 'Auto-Write Description'}
                        </button>
                    </div>
                    <div className="relative">
                        <Briefcase className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            name="title"
                            required
                            placeholder="e.g. Senior React Developer"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Location & Type Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Location</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                name="location"
                                required
                                placeholder="e.g. Cairo (Hybrid)"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Employment Type</label>
                        <select
                            name="employmentType"
                            value={formData.employmentType}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                        >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>
                </div>

                {/* Salary */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Salary Range</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            name="salaryRange"
                            placeholder="e.g. EGP 20k - 30k"
                            value={formData.salaryRange}
                            onChange={handleChange}
                            className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Job Description</label>
                    <div className="relative">
                        <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <textarea
                            name="description"
                            required
                            rows={5}
                            placeholder="Describe the role, responsibilities, and company culture..."
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Requirements */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Requirements</label>
                    <div className="relative">
                        <CheckCircle2 className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <textarea
                            name="requirements"
                            required
                            rows={4}
                            placeholder="• 3+ years of React experience&#10;• TypeScript proficiency&#10;• Strong communication skills"
                            value={formData.requirements}
                            onChange={handleChange}
                            className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" /> Publishing...
                        </>
                    ) : (
                        <>
                            Publish Job Listing <ChevronRightWrapper />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

// Helper for icon consistency without extra imports if needed, but we imported icons.
const ChevronRightWrapper = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6" />
    </svg>
);
