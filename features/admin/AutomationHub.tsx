import React, { useState } from 'react';
import { Briefcase, Building2, Calendar, Play, Loader2, Globe, Database, Server, Newspaper } from 'lucide-react';
import { fetchLiveJobs, ingestCompanies, fetchGlobalEvents } from '../../services/api/automationService';
import { fetchAndGenerateNews, NewsCategory } from '../../services/api/newsService';

export const AutomationHub: React.FC = () => {
    // --- State for Card 1: Jobs ---
    const [jobKeyword, setJobKeyword] = useState('Real Estate Egypt');
    const [jobLimit, setJobLimit] = useState(10);
    const [isJobLoading, setIsJobLoading] = useState(false);

    // --- State for Card 2: Companies ---
    const [compIndustry, setCompIndustry] = useState('Real Estate & Construction');
    const [compCountry, setCompCountry] = useState('Egypt');
    const [isCompLoading, setIsCompLoading] = useState(false);

    // --- State for Card 3: Events ---
    const [eventQuery, setEventQuery] = useState('Global Real Estate Exhibitions 2026');
    const [isEventLoading, setIsEventLoading] = useState(false);

    // --- State for Card 4: News ---
    const [newsCategory, setNewsCategory] = useState<NewsCategory>('Market News');
    const [newsCount, setNewsCount] = useState(5);
    const [isNewsLoading, setIsNewsLoading] = useState(false);

    // --- Handlers ---
    const handleRunJobScraper = async () => {
        setIsJobLoading(true);
        try {
            const count = await fetchLiveJobs(jobKeyword, jobLimit);
            alert(`Success: ${count} Jobs Ingested!`);
        } catch (error) {
            console.error(error);
            alert('Failed to ingest jobs.');
        } finally {
            setIsJobLoading(false);
        }
    };

    const handleIngestCompanies = async () => {
        setIsCompLoading(true);
        try {
            const count = await ingestCompanies(compIndustry, compCountry);
            alert(`Success: ${count} Companies Discovered & Ingested!`);
        } catch (error) {
            console.error(error);
            alert('Failed to ingest companies.');
        } finally {
            setIsCompLoading(false);
        }
    };

    const handleCrawlEvents = async () => {
        setIsEventLoading(true);
        try {
            const count = await fetchGlobalEvents(eventQuery);
            alert(`Success: ${count} Events Crawled & Published!`);
        } catch (error) {
            console.error(error);
            alert('Failed to crawl events.');
        } finally {
            setIsEventLoading(false);
        }
    };

    const handleGenerateNews = async () => {
        setIsNewsLoading(true);
        try {
            // Hardcoded source for now as per minimal requirement, or could be added to UI
            const posts = await fetchAndGenerateNews(newsCategory, newsCount);
            alert(`Success: ${posts.length} News Articles Generated!`);
        } catch (error) {
            console.error(error);
            alert('Failed to generate news.');
        } finally {
            setIsNewsLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                    <Server size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Data Automation Hub</h2>
                    <p className="text-slate-500 dark:text-slate-400">Manage automated ingestion pipelines for Jobs, Companies, Events, and News.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* --- Card 1: Live Jobs Sync --- */}
                <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm flex flex-col gap-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20">
                            <Briefcase size={20} />
                        </div>
                        <h3 className="font-bold text-slate-800 dark:text-slate-100">Live Jobs Sync</h3>
                    </div>

                    <div className="space-y-3 flex-1">
                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Keyword</label>
                            <input
                                type="text"
                                value={jobKeyword}
                                onChange={(e) => setJobKeyword(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-[#252525] border border-slate-200 dark:border-[#444] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Limit</label>
                            <select
                                value={jobLimit}
                                onChange={(e) => setJobLimit(Number(e.target.value))}
                                className="w-full bg-slate-50 dark:bg-[#252525] border border-slate-200 dark:border-[#444] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value={10}>10 Jobs</option>
                                <option value={50}>50 Jobs</option>
                                <option value={100}>100 Jobs</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={handleRunJobScraper}
                        disabled={isJobLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isJobLoading ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} />}
                        Run Job Scraper
                    </button>
                    <p className="text-xs text-slate-400 text-center">Powered by Google Jobs API</p>
                </div>

                {/* --- Card 2: Company Expansion Scraper --- */}
                <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm flex flex-col gap-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20">
                            <Building2 size={20} />
                        </div>
                        <h3 className="font-bold text-slate-800 dark:text-slate-100">Company Expansion</h3>
                    </div>

                    <div className="space-y-3 flex-1">
                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Industry</label>
                            <input
                                type="text"
                                value={compIndustry}
                                onChange={(e) => setCompIndustry(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-[#252525] border border-slate-200 dark:border-[#444] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Target Country</label>
                            <input
                                type="text"
                                value={compCountry}
                                onChange={(e) => setCompCountry(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-[#252525] border border-slate-200 dark:border-[#444] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleIngestCompanies}
                        disabled={isCompLoading}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isCompLoading ? <Loader2 size={18} className="animate-spin" /> : <Database size={18} />}
                        Discover & Ingest
                    </button>
                    <p className="text-xs text-slate-400 text-center">Powered by Apify Scraper</p>
                </div>

                {/* --- Card 3: Global Events Crawler --- */}
                <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm flex flex-col gap-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20">
                            <Calendar size={20} />
                        </div>
                        <h3 className="font-bold text-slate-800 dark:text-slate-100">Events & Expos</h3>
                    </div>

                    <div className="space-y-3 flex-1">
                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Year / Topic</label>
                            <input
                                type="text"
                                value={eventQuery}
                                onChange={(e) => setEventQuery(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-[#252525] border border-slate-200 dark:border-[#444] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-[#252525] rounded-lg border border-slate-200 dark:border-[#444]">
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                This crawler uses <strong>Gemini AI</strong> to extract event dates, locations, and descriptions from crawled news articles.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleCrawlEvents}
                        disabled={isEventLoading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isEventLoading ? <Loader2 size={18} className="animate-spin" /> : <Globe size={18} />}
                        Crawl & Publish
                    </button>
                    <p className="text-xs text-slate-400 text-center">Powered by Serper + Gemini</p>
                </div>

                {/* --- Card 4: News Automation --- */}
                <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm flex flex-col gap-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-900/20">
                            <Newspaper size={20} />
                        </div>
                        <h3 className="font-bold text-slate-800 dark:text-slate-100">News Automation</h3>
                    </div>

                    <div className="space-y-3 flex-1">
                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Category</label>
                            <select
                                value={newsCategory}
                                onChange={(e) => setNewsCategory(e.target.value as NewsCategory)}
                                className="w-full bg-slate-50 dark:bg-[#252525] border border-slate-200 dark:border-[#444] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                <option value="Market News">Market News</option>
                                <option value="Construction">Construction</option>
                                <option value="Events">Events</option>
                                <option value="Market Reports & Analysis">Market Reports</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Article Count</label>
                            <select
                                value={newsCount}
                                onChange={(e) => setNewsCount(Number(e.target.value))}
                                className="w-full bg-slate-50 dark:bg-[#252525] border border-slate-200 dark:border-[#444] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                <option value={3}>3 Articles</option>
                                <option value={5}>5 Articles</option>
                                <option value={10}>10 Articles</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={handleGenerateNews}
                        disabled={isNewsLoading}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isNewsLoading ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} />}
                        Generate News
                    </button>
                    <p className="text-xs text-slate-400 text-center">Powered by Serper + Gemini</p>
                </div>

            </div>
        </div>
    );
};
