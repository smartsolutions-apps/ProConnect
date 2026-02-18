import React, { useState } from 'react';
import { Search, Database } from 'lucide-react';
import { useOmniSearch, OmniResultType } from '../../hooks/useOmniSearch';
import { ModerationRow } from './ModerationRow';
import { seedDatabaseToFirebase } from '../../services/firebaseSeeder';
import { AdminDetailDrawer } from './AdminDetailDrawer';
import { AdminContentGenerator } from './AdminContentGenerator';
import { AutomationHub } from './AutomationHub';
import { ApiIntegrationManager } from './ApiIntegrationManager';
import { GlobalActivityFeed } from './GlobalActivityFeed';
import { useHydratedData } from '../../context/DataHydrationContext';
import { AdminDataTable } from './components/AdminDataTable';

export const AdminCommandCenter: React.FC = () => {
    const { companies, jobs, newsFeed } = useHydratedData();
    const { searchTerm, setSearchTerm, results } = useOmniSearch();
    const [activeFilter, setActiveFilter] = useState<OmniResultType | 'all' | 'automation' | 'api-manager' | 'activity-feed'>('all');
    const [selectedEntity, setSelectedEntity] = useState<any>(null);

    const filteredResults = activeFilter === 'all'
        ? results
        : results.filter(r => r.type === activeFilter);

    // Filter pills configuration
    const filters: { id: OmniResultType | 'all' | 'automation' | 'api-manager' | 'activity-feed', label: string }[] = [
        { id: 'all', label: 'All Entities' },
        { id: 'automation', label: '⚡ Automation Hub' },
        { id: 'api-manager', label: '🔌 API Manager' },
        { id: 'activity-feed', label: '📜 Activity Feed' }, // New Pill
        { id: 'user', label: 'Users' },
        { id: 'company', label: 'Companies' },
        { id: 'job', label: 'Jobs' },
        // { id: 'post', label: 'Social Posts' } // Uncomment when posts are fully integrated
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#121212] py-8">
            <div className="max-w-6xl mx-auto px-4 space-y-6">

                {/* Header & Omni-Search */}
                <div className="space-y-4">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Command Center</h1>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-6 w-6 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-12 pr-4 py-4 bg-white dark:bg-[#1e1e1e] border border-slate-200 dark:border-[#333] rounded-xl text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Omni-Search: Type 'Manager', 'Vodafone', or user name..."
                            autoFocus
                        />
                    </div>
                </div>

                {/* AI Content Engine */}
                <AdminContentGenerator />

                {/* Filter Pills */}
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {filters.map(filter => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeFilter === filter.id
                                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                                : 'bg-white dark:bg-[#1e1e1e] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#333] hover:bg-slate-100 dark:hover:bg-[#252525]'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Render Automation Hub OR API Manager OR Activity Feed OR Standard Grid */}
                {activeFilter === 'automation' ? (
                    <AutomationHub />
                ) : activeFilter === 'api-manager' ? (
                    <ApiIntegrationManager />
                ) : activeFilter === 'activity-feed' ? (
                    <GlobalActivityFeed />
                ) : (
                    <>
                        {/* Database Migration Card (Keep existing) */}
                        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-xl p-6 mb-6">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg h-fit">
                                        <Database className="text-amber-700 dark:text-amber-500" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Database Migration & Seeding</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-xl">
                                            Push local static data (`realCompanies.ts` & `realJobs.ts`) to the active Firebase Firestore instance.
                                            This uses <strong>Batch Writes</strong> to efficiently sync hundreds of records.
                                        </p>
                                        <div className="mt-4 flex items-center gap-3">
                                            <button
                                                onClick={() => seedDatabaseToFirebase()}
                                                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-sm transition-all flex items-center gap-2"
                                            >
                                                <Database size={18} /> Push Local Data to Firebase
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dynamic Data Tables */}
                        {(activeFilter === 'all' || activeFilter === 'company') && (
                            <div className="mb-8">
                                <AdminDataTable
                                    collectionName="companies"
                                    data={companies}
                                    columns={[
                                        { key: 'title', label: 'Company Name' },
                                        { key: 'industry', label: 'Industry' },
                                        { key: 'location', label: 'HQ Location' }
                                    ]}
                                />
                            </div>
                        )}

                        {(activeFilter === 'all' || activeFilter === 'job') && (
                            <div className="mb-8">
                                <AdminDataTable
                                    collectionName="jobs"
                                    data={jobs}
                                    columns={[
                                        { key: 'title', label: 'Job Title' },
                                        { key: 'companyName', label: 'Company' },
                                        { key: 'type', label: 'Type' },
                                        { key: 'location', label: 'Location' }
                                    ]}
                                />
                            </div>
                        )}

                        {(activeFilter === 'all' || activeFilter === 'post') && (
                            <div className="mb-8">
                                <AdminDataTable
                                    collectionName="posts"
                                    data={newsFeed}
                                    columns={[
                                        { key: 'content', label: 'Snippet', render: (val) => val.substring(0, 50) + '...' },
                                        { key: 'category', label: 'Category' },
                                        { key: 'source', label: 'Source' }
                                    ]}
                                />
                            </div>
                        )}

                        {/* Fallback for Users (using OmniResult for now as we don't have a full users hook yet) */}
                        {activeFilter === 'user' && (
                            <div className="bg-white dark:bg-[#1e1e1e] rounded-xl border border-slate-200 dark:border-[#333] shadow-sm overflow-hidden min-h-[400px]">
                                {filteredResults.length > 0 ? (
                                    <div>
                                        <div className="grid grid-cols-12 px-4 py-3 bg-slate-50 dark:bg-[#252525] border-b border-slate-100 dark:border-[#333] text-xs font-bold text-slate-500 uppercase tracking-wider items-center">
                                            <span className="col-span-4">Entity</span>
                                            <span className="col-span-3">Location / Industry</span>
                                            <span className="col-span-2 text-center">Status</span>
                                            <span className="col-span-2">Source</span>
                                            <span className="col-span-1 text-right">Actions</span>
                                        </div>
                                        {filteredResults.map(result => (
                                            <ModerationRow
                                                key={`${result.type}-${result.id}`}
                                                item={result}
                                                onView={() => setSelectedEntity(result)}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-[400px] text-slate-400">
                                        <Search size={24} className="mb-4" />
                                        <p>No users found via Omni-Search.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}

                <AdminDetailDrawer
                    isOpen={!!selectedEntity}
                    onClose={() => setSelectedEntity(null)}
                    entity={selectedEntity}
                />
            </div>
        </div>
    );
};
