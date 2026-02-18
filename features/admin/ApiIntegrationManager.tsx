import React, { useState } from 'react';
import { useIntegrations, IntegrationState } from '../../hooks/useIntegrations';
import { Shield, ShieldAlert, Key, RefreshCw, Eye, EyeOff, Save, CheckCircle2, Activity } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

export const ApiIntegrationManager: React.FC = () => {
    const { integrations, toggleIntegration, updateApiKey, updateFrequency } = useIntegrations();
    const [showKey, setShowKey] = useState<Record<string, boolean>>({});
    const [logs, setLogs] = useState<any[]>([]);

    React.useEffect(() => {
        const q = query(
            collection(db, 'api_logs'),
            orderBy('timestamp', 'desc'),
            limit(5)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setLogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, []);

    const toggleKeyVisibility = (id: string) => {
        setShowKey(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-[#1e1e1e] rounded-xl border border-slate-200 dark:border-[#333] p-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                        <Shield className="text-indigo-600 dark:text-indigo-400" size={24} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">API & Integrations Manager</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Centralized control for external data sources. Manage keys, sync frequency, and kill switches.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                {integrations.map((integration) => (
                    <IntegrationCard
                        key={integration.id}
                        integration={integration}
                        showKey={!!showKey[integration.id]}
                        onToggleKey={() => toggleKeyVisibility(integration.id)}
                        onToggleActive={() => toggleIntegration(integration.id)}
                        onUpdateKey={(key) => updateApiKey(integration.id, key)}
                        onUpdateFrequency={(freq) => updateFrequency(integration.id, freq)}
                    />
                ))}
            </div>

            {/* Recent API Activity Logs */}
            <div className="bg-white dark:bg-[#1e1e1e] rounded-xl border border-slate-200 dark:border-[#333] overflow-hidden">
                <div className="p-4 border-b border-slate-100 dark:border-[#2d2d2d] flex items-center gap-2">
                    <Activity size={18} className="text-slate-400" />
                    <h3 className="font-bold text-slate-700 dark:text-slate-200">Recent API Activity Logs</h3>
                </div>
                <div>
                    {logs.length === 0 ? (
                        <div className="p-8 text-center text-slate-400 text-sm">No activity logs found.</div>
                    ) : (
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 dark:bg-[#252525] text-slate-500 font-medium">
                                <tr>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Service</th>
                                    <th className="px-4 py-3">Message</th>
                                    <th className="px-4 py-3 text-right">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-[#2d2d2d]">
                                {logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-[#252525]/50 transition-colors">
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${log.status === 'Success'
                                                ? 'bg-emerald-50 border-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:border-emerald-900/50 dark:text-emerald-400'
                                                : 'bg-amber-50 border-amber-100 text-amber-600 dark:bg-amber-900/20 dark:border-amber-900/50 dark:text-amber-400'
                                                }`}>
                                                {log.status === 'Success' ? <CheckCircle2 size={12} /> : <ShieldAlert size={12} />}
                                                {log.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">
                                            {log.serviceName}
                                        </td>
                                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400 max-w-xs truncate" title={log.summary}>
                                            {log.summary}
                                        </td>
                                        <td className="px-4 py-3 text-right text-slate-400 font-mono text-xs">
                                            {log.timestamp?.seconds ? new Date(log.timestamp.seconds * 1000).toLocaleTimeString() : 'Just now'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

interface IntegrationCardProps {
    integration: IntegrationState;
    showKey: boolean;
    onToggleKey: () => void;
    onToggleActive: () => void;
    onUpdateKey: (key: string) => void;
    onUpdateFrequency: (freq: IntegrationState['frequency']) => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
    integration,
    showKey,
    onToggleKey,
    onToggleActive,
    onUpdateKey,
    onUpdateFrequency
}) => {
    const [isTesting, setIsTesting] = useState(false);
    const [testStatus, setTestStatus] = useState<'idle' | 'success' | 'failed'>('idle');

    const handleTestConnection = () => {
        setIsTesting(true);
        setTestStatus('idle');

        // Simulate API test
        setTimeout(() => {
            setIsTesting(false);
            setTestStatus('success'); // Mock success for now
            setTimeout(() => setTestStatus('idle'), 3000);
        }, 1500);
    };

    return (
        <div className={`
            relative overflow-hidden rounded-xl border transition-all duration-300
            ${integration.isEnabled
                ? 'bg-white dark:bg-[#1e1e1e] border-slate-200 dark:border-[#333] shadow-sm hover:shadow-md'
                : 'bg-slate-50 dark:bg-[#111] border-slate-200 dark:border-[#333] opacity-75'
            }
        `}>
            {/* Status Stripe */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${integration.isEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`} />

            <div className="p-6 pl-8 flex flex-col md:flex-row gap-6 items-start md:items-center">

                {/* 1. Header & Toggle */}
                <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-slate-900 dark:text-white text-lg">{integration.name}</h3>
                        {integration.isEnabled ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                                Active
                            </span>
                        ) : (
                            <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                                Paused
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{integration.description}</p>

                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={integration.isEnabled}
                            onChange={onToggleActive}
                        />
                        <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-slate-900 dark:text-gray-300">
                            {integration.isEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                    </label>
                </div>

                {/* 2. API Key Management */}
                <div className="flex-1 w-full md:max-w-md">
                    <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide flex items-center gap-1">
                        <Key size={12} /> API Key Configuration
                    </label>
                    <div className="relative">
                        <input
                            type={showKey ? "text" : "password"}
                            value={integration.apiKey}
                            onChange={(e) => onUpdateKey(e.target.value)}
                            placeholder={integration.apiKey ? "••••••••••••••••" : "Using Environment Variable"}
                            disabled={!integration.isEnabled}
                            className="w-full bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#333] rounded-lg pl-3 pr-10 py-2.5 text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50"
                        />
                        <button
                            onClick={onToggleKey}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                {/* 3. Settings & Actions */}
                <div className="flex flex-col gap-3 w-full md:w-auto min-w-[160px]">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide flex items-center gap-1">
                            <Activity size={12} /> Sync Frequency
                        </label>
                        <select
                            value={integration.frequency}
                            onChange={(e) => onUpdateFrequency(e.target.value as any)}
                            disabled={!integration.isEnabled}
                            className="w-full bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#333] rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50"
                        >
                            <option value="manual">Manual Only</option>
                            <option value="12h">Every 12 Hours</option>
                            <option value="24h">Every 24 Hours</option>
                            <option value="weekly">Weekly</option>
                        </select>
                    </div>

                    <button
                        onClick={handleTestConnection}
                        disabled={!integration.isEnabled || isTesting}
                        className={`
                            px-4 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all
                            ${testStatus === 'success'
                                ? 'bg-emerald-500 text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }
                            disabled:opacity-50 disabled:cursor-not-allowed
                        `}
                    >
                        {isTesting ? (
                            <RefreshCw size={16} className="animate-spin" />
                        ) : testStatus === 'success' ? (
                            <>
                                <CheckCircle2 size={16} /> Connected
                            </>
                        ) : (
                            <>
                                <RefreshCw size={16} /> Test Connection
                            </>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
};
