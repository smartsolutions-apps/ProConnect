import React, { useEffect, useState } from 'react';
import { fetchRecentActivities, ActivityLog, ActionType } from '../../services/api/apiLogger';
import { Clock, RefreshCw, AlertCircle, CheckCircle, Database, UserPlus, FileText, Filter, Trash2, FileEdit, PlusCircle, Link, ExternalLink, Activity } from 'lucide-react';

export const GlobalActivityFeed: React.FC = () => {
    const [activities, setActivities] = useState<ActivityLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState<ActionType | 'All'>('All');
    const [timeRange, setTimeRange] = useState<'Today' | '7 Days' | '30 Days'>('Today');

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await fetchRecentActivities(50);
            setActivities(data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
        // Optional: Set up an interval or real-time listener if needed
        const interval = setInterval(loadData, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, []);

    // Helper: Get Icon based on Action Type
    const getIconForAction = (type: string) => {
        const lowerType = type.toLowerCase();
        if (lowerType.includes('delete') || lowerType.includes('remove')) return <Trash2 size={16} className="text-red-500" />;
        if (lowerType.includes('update') || lowerType.includes('edit')) return <FileEdit size={16} className="text-blue-500" />;
        if (lowerType.includes('create') || lowerType.includes('add') || lowerType.includes('new')) return <PlusCircle size={16} className="text-green-500" />;

        switch (type) {
            case 'User Joined': return <UserPlus size={16} />;
            case 'Company Added': return <Database size={16} />;
            case 'News Generated': return <FileText size={16} />;
            case 'System Error': return <AlertCircle size={16} />;
            case 'Data Ingestion': return <RefreshCw size={16} />;
            default: return <Activity size={16} className="text-slate-400" />;
        }
    };

    // Helper: Get Color based on Status/Type
    const getColorClass = (type: ActionType, status: 'Success' | 'Failed') => {
        if (status === 'Failed' || type === 'System Error') return 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400';
        switch (type) {
            case 'News Generated': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
            case 'Company Added': return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400';
            case 'User Joined': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400';
            default: return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
        }
    };

    // Filter Logic
    const filteredActivities = activities.filter(act => {
        if (filterType !== 'All' && act.actionType !== filterType) return false;
        // Time range logic could be implemented here if we parsed the timestamp properly
        return true;
    });

    return (
        <div className="bg-white dark:bg-[#1e1e1e] rounded-xl border border-slate-200 dark:border-[#333] shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 dark:border-[#333] flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Clock className="text-blue-600 dark:text-blue-400" size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Global Activity Feed</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Real-time audit trail of system events</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={loadData}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-[#2d2d2d] rounded-lg transition-colors text-slate-500"
                        title="Refresh"
                    >
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    </button>

                    {/* Simple Filter Dropdown Mockup */}
                    <div className="relative">
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value as any)}
                            className="bg-slate-50 dark:bg-[#252525] border border-slate-200 dark:border-[#333] text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-200 appearance-none cursor-pointer"
                        >
                            <option value="All">All Events</option>
                            <option value="News Generated">News Generation</option>
                            <option value="Data Ingestion">Data Updates</option>
                            <option value="Company Added">Company Added</option>
                            <option value="System Error">Errors</option>
                        </select>
                        <Filter size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="divide-y divide-slate-100 dark:divide-[#2c2c2c] max-h-[600px] overflow-y-auto custom-scrollbar">
                {loading && activities.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-sm">Loading activities...</div>
                ) : filteredActivities.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-sm">No activity found for this filter.</div>
                ) : (
                    filteredActivities.map((activity) => (
                        <div key={activity.id} className="p-4 flex gap-4 hover:bg-slate-50 dark:hover:bg-[#252525] transition-colors">
                            {/* Icon Badge */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-100 dark:border-[#333]`}>
                                {getIconForAction(activity.actionType)}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                                        {activity.actionType}
                                    </h4>
                                    <span className="text-xs text-slate-400 font-medium whitespace-nowrap ml-2">
                                        {activity.timestamp?.toDate ? activity.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug flex items-center gap-2">
                                    {activity.description}
                                    {activity.meta?.entityUrl && (
                                        <a
                                            href={activity.meta.entityUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-500 hover:text-indigo-600 inline-flex items-center gap-1"
                                            title="View Entity"
                                        >
                                            <ExternalLink size={12} />
                                        </a>
                                    )}
                                </p>
                                {activity.status === 'Failed' && (
                                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold">
                                        <AlertCircle size={12} /> Failed
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer Stats */}
            <div className="bg-slate-50 dark:bg-[#252525] p-3 border-t border-slate-200 dark:border-[#333] flex justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span>Showing {filteredActivities.length} events</span>
                <span>Server Time: {new Date().toLocaleTimeString()}</span>
            </div>
        </div>
    );
};
