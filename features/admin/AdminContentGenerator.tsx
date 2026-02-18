import React, { useState } from 'react';
import { Bot, RefreshCw, Send, CheckCircle2 } from 'lucide-react';
import { fetchAndGenerateNews, NewsCategory } from '../../services/api/newsService';

export const AdminContentGenerator: React.FC = () => {
    const [category, setCategory] = useState<NewsCategory>('Market News');
    const [targetSource, setTargetSource] = useState<string>('');
    const [count, setCount] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleGenerate = async () => {
        setIsLoading(true);
        setSuccessMessage(null);
        try {
            await fetchAndGenerateNews(category, count, targetSource);
            setSuccessMessage(`Successfully generated ${count} fresh posts for ${category}!`);
            setTimeout(() => setSuccessMessage(null), 5000);
        } catch (error) {
            console.error("Failed to generate content", error);
            alert("Failed to generate content. Check console for details.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 mb-6 text-white shadow-xl relative overflow-hidden border border-slate-700">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Bot size={120} />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg backdrop-blur-sm">
                        <Bot size={24} className="text-blue-400" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">AI Content Engine</h2>
                        <p className="text-sm text-slate-400">Automated News Crawling & Rewriting</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-end">

                    <div className="flex-1 w-full">
                        <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">Target Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as NewsCategory)}
                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        >
                            <option value="Market News">Market News</option>
                            <option value="Construction">Construction Updates</option>
                            <option value="Events">Project Launches & Events</option>
                            <option value="Market Reports & Analysis">Market Reports & Analysis</option>
                        </select>
                    </div>

                    <div className="flex-1 w-full">
                        <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">Target Source</label>
                        <select
                            value={targetSource}
                            onChange={(e) => setTargetSource(e.target.value)}
                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        >
                            <option value="">Broad Market (All Sources)</option>
                            <option value="site:invest-gate.me">Invest-Gate Egypt</option>
                            <option value="site:enterprise.press">Enterprise News</option>
                            <option value="site:zawya.com">Zawya Real Estate</option>
                        </select>
                    </div>

                    <div className="w-full md:w-32">
                        <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">Post Count</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={count}
                            onChange={(e) => setCount(parseInt(e.target.value))}
                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    <div className="w-full md:w-auto">
                        <button
                            onClick={handleGenerate}
                            disabled={isLoading}
                            className={`w-full md:w-auto px-6 py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-all
                                ${isLoading
                                    ? 'bg-slate-600 cursor-not-allowed opacity-70'
                                    : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-900/20'
                                }
                            `}
                        >
                            {isLoading ? (
                                <>
                                    <RefreshCw size={18} className="animate-spin" />
                                    Crawling...
                                </>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Generate & Publish
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {successMessage && (
                    <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center gap-2 text-emerald-300 text-sm animate-in fade-in slide-in-from-top-2">
                        <CheckCircle2 size={16} />
                        {successMessage}
                    </div>
                )}
            </div>
        </div>
    );
};
