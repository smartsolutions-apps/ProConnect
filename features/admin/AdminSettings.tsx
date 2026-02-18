import React from 'react';
import { Settings, Server, Database, AlertTriangle } from 'lucide-react';

export const AdminSettings: React.FC = () => {
    return (
        <div className="space-y-6">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Settings className="text-slate-400" />
                    Global Platform Settings
                </h1>
                <p className="text-slate-500 dark:text-slate-400">Manage system-wide configurations and maintenance modes.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Maintenance Mode Card */}
                <div className="bg-white dark:bg-[#1e1e1e] rounded-xl border border-slate-200 dark:border-[#333] p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                            <AlertTriangle className="text-amber-600 dark:text-amber-500" size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white">Maintenance Mode</h3>
                            <p className="text-sm text-slate-500">Suspend all user access temporarily</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between bg-slate-50 dark:bg-[#252525] p-4 rounded-lg">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">System Status</span>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span className="text-sm font-bold text-emerald-600">Operational</span>
                        </div>
                    </div>
                    <button className="mt-4 w-full py-2 border border-slate-300 dark:border-[#444] rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#252525] transition-colors">
                        Enable Maintenance Mode
                    </button>
                </div>

                {/* API Configuration Card */}
                <div className="bg-white dark:bg-[#1e1e1e] rounded-xl border border-slate-200 dark:border-[#333] p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                            <Server className="text-blue-600 dark:text-blue-500" size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white">API Configuration</h3>
                            <p className="text-sm text-slate-500">Manage external service connections</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-600 dark:text-slate-400">Serper.dev</span>
                            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold">Connected</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-600 dark:text-slate-400">Gemini AI</span>
                            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold">Connected</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-600 dark:text-slate-400">Firebase</span>
                            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold">Connected</span>
                        </div>
                    </div>
                    <button className="mt-4 w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
                        Manage Keys
                    </button>
                </div>
            </div>
        </div>
    );
};
