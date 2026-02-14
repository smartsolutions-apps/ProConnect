import React, { useState } from 'react';
import { Activity, Users, Building2, FileText, AlertTriangle, ShieldCheck, Download, Wand2, Loader2, Edit, CheckCircle2 } from 'lucide-react';
import { DataTable, Column } from '../../components/common/DataTable';
import { USERS, REAL_COMPANIES, JOBS } from '../../data';
import { User, Company, Job } from '../../types';
import { AdminCompanyEditor } from './AdminCompanyEditor';

const BRANDFETCH_CLIENT_ID = "1idiSqP5yegNdsQZndZ";
const FALLBACK_LOGO = "https://ui-avatars.com/api/?name=Real+Estate&background=0D8ABC&color=fff&rounded=true&bold=true";

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'health' | 'users' | 'companies' | 'jobs' | 'import'>('health');
  const [importText, setImportText] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [allCompanies, setAllCompanies] = useState<Company[]>(REAL_COMPANIES);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // Stats Logic
  const totalUsers = USERS.length + 142;
  const totalCompanies = allCompanies.length;
  const totalJobs = JOBS.length + 56;
  const activeAlerts = 3;

  const handleBulkImport = () => {
    if (!importText.trim()) return;
    setIsImporting(true);
    
    // Simulate API logic
    const domains = importText.split(',').map(d => d.trim()).filter(Boolean);
    
    setTimeout(() => {
        const newCompanies: Company[] = domains.map(domain => {
            const name = domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
            return {
                id: `c_${Math.random().toString(36).substr(2, 9)}`,
                name: name,
                domain: domain,
                logoUrl: `https://cdn.brandfetch.io/domain/${domain}?c=${BRANDFETCH_CLIENT_ID}`,
                industry: "Uncategorized",
                location: "Egypt",
                isVerified: false,
                isClaimed: false,
                description: `Imported via admin portal on ${new Date().toLocaleDateString()}`
            };
        });
        
        setAllCompanies(prev => [...newCompanies, ...prev]);
        setIsImporting(false);
        setImportText('');
        setActiveTab('companies');
    }, 2000);
  };

  const handleUpdateCompany = (updated: Company) => {
    setAllCompanies(prev => prev.map(c => c.id === updated.id ? updated : c));
    setSelectedCompany(null);
  };

  const renderHealthTab = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
           { label: 'Total Users', val: totalUsers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
           { label: 'Verified Companies', val: totalCompanies, icon: Building2, color: 'text-purple-600', bg: 'bg-purple-50' },
           { label: 'Active Jobs', val: totalJobs, icon: FileText, color: 'text-green-600', bg: 'bg-green-50' },
           { label: 'Content Alerts', val: activeAlerts, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl border border-gray-100 dark:border-[#333333] shadow-sm flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                    <stat.icon className={stat.color} size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.val}</h3>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
                </div>
            </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl border border-gray-100 dark:border-[#333333] shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Recent System Activity</h3>
            <div className="space-y-4">
                {[
                    { msg: "New company registration: Robosta", time: "2m ago", type: "info" },
                    { msg: "User reported job: 'Scam listing'", time: "15m ago", type: "alert" },
                    { msg: "System backup completed", time: "1h ago", type: "success" },
                    { msg: "High traffic alert: Cairo Region", time: "3h ago", type: "warning" }
                ].map((log, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                        <div className={`w-2 h-2 rounded-full ${log.type === 'alert' ? 'bg-red-500' : log.type === 'success' ? 'bg-green-500' : log.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                        <span className="text-gray-700 dark:text-gray-300 flex-1">{log.msg}</span>
                        <span className="text-gray-400 text-xs">{log.time}</span>
                    </div>
                ))}
            </div>
         </div>

         <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-lg text-white">
            <h3 className="font-bold mb-2 flex items-center gap-2">
                <ShieldCheck className="text-green-400"/> System Status
            </h3>
            <p className="text-gray-400 text-sm mb-6">All systems operational. Database latency: 24ms.</p>
            
            <div className="space-y-3">
                <div className="flex justify-between text-sm">
                    <span>API Uptime</span>
                    <span className="text-green-400 font-mono">99.99%</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full w-[99%]"></div>
                </div>

                <div className="flex justify-between text-sm mt-4">
                    <span>Storage Usage</span>
                    <span className="text-blue-400 font-mono">42%</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-50 h-full w-[42%]"></div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );

  const renderImportTab = () => (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm border border-gray-100 dark:border-[#333333] p-8 animate-in fade-in slide-in-from-bottom-2">
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-brand-50 dark:bg-brand-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Download className="text-brand-600 dark:text-brand-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Bulk Company Importer</h3>
                <p className="text-sm text-gray-500 mt-2">Enter corporate domains to generate high-fidelity profiles via Brandfetch API.</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Domain List (Comma separated)</label>
                    <textarea 
                        value={importText}
                        onChange={(e) => setImportText(e.target.value)}
                        placeholder="vodafone.com.eg, fawry.com, swvl.com, cibeg.com"
                        rows={5}
                        className="w-full p-4 bg-gray-50 dark:bg-[#2d2d2d] border border-gray-200 dark:border-[#333333] rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none text-gray-900 dark:text-white placeholder-gray-400"
                    />
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl flex gap-3 border border-blue-100 dark:border-blue-900/30">
                    <AlertTriangle className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={20} />
                    <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                        This tool will automatically fetch logos and initialize profiles using <strong>Brandfetch CDN</strong>. Profiles remain unverified until enriched.
                    </p>
                </div>

                <button 
                    onClick={handleBulkImport}
                    disabled={isImporting || !importText.trim()}
                    className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                    {isImporting ? (
                        <>
                            <Loader2 className="animate-spin" size={20} /> Generating Profiles...
                        </>
                    ) : (
                        <>
                            <Wand2 size={20} /> Analyze & Bulk Create
                        </>
                    )}
                </button>
            </div>
        </div>
    </div>
  );

  // --- Column Definitions ---

  const userColumns: Column<User>[] = [
    { header: "User", accessor: (u) => (
        <div className="flex items-center gap-3">
            <img src={u.avatarUrl} className="w-8 h-8 rounded-full bg-gray-100" onError={(e) => { e.currentTarget.src = FALLBACK_LOGO; }} />
            <div>
                <p className="font-bold text-gray-900 dark:text-white">{u.name}</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{u.role || 'user'}</p>
            </div>
        </div>
    )},
    { header: "Headline", accessor: (u) => <span className="text-xs">{u.headline}</span>, className: "max-w-xs truncate" },
    { header: "Location", accessor: (u) => u.location },
    { header: "Status", accessor: () => <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] rounded-full font-bold">Active</span> }
  ];

  const companyColumns: Column<Company>[] = [
    { header: "Company", accessor: (c) => (
        <div className="flex items-center gap-3">
            <img 
                src={`https://cdn.brandfetch.io/domain/${c.domain || 'google.com'}?c=${BRANDFETCH_CLIENT_ID}`} 
                className="w-8 h-8 rounded bg-white border border-gray-100 object-contain" 
                onError={(e) => { e.currentTarget.src = FALLBACK_LOGO; }}
            />
            <div>
                <p className="font-bold text-gray-900 dark:text-white">{c.name}</p>
                <p className="text-xs text-gray-500">{c.industry} {c.type && `• ${c.type}`}</p>
            </div>
        </div>
    )},
    { header: "Status", accessor: (c) => (
        <div className="flex flex-col gap-1">
            {c.isVerified && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] rounded-full font-bold flex items-center w-fit gap-1"><ShieldCheck size={10}/> Verified</span>}
            {c.isClaimed ? (
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] rounded-full font-bold flex items-center w-fit gap-1"><CheckCircle2 size={10}/> Claimed</span>
            ) : (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded-full font-bold flex items-center w-fit gap-1">Unclaimed</span>
            )}
        </div>
    )},
    { header: "Edit", accessor: (c) => (
        <button 
            onClick={() => setSelectedCompany(c)}
            className="p-2 hover:bg-brand-50 dark:hover:bg-brand-900/20 text-brand-600 dark:text-brand-400 rounded-lg transition-colors"
        >
            <Edit size={16} />
        </button>
    )}
  ];

  const jobColumns: Column<Job>[] = [
    { header: "Job Title", accessor: (j) => <span className="font-medium text-gray-900 dark:text-white">{j.title}</span> },
    { header: "Company", accessor: (j) => j.companyName },
    { header: "Type", accessor: (j) => j.type },
    { header: "Applicants", accessor: (j) => j.applicantsCount }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm border border-gray-100 dark:border-[#333333] p-4">
        <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={24} className="text-red-600" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Super Admin Console</h2>
        </div>
        <div className="flex gap-4 border-b border-gray-100 dark:border-[#333333] overflow-x-auto no-scrollbar">
            {[
                { id: 'health', label: 'System Health' },
                { id: 'users', label: 'User Directory' },
                { id: 'companies', label: 'Company Manager' },
                { id: 'jobs', label: 'Job Stream' },
                { id: 'import', label: 'Import Center' },
            ].map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-3 text-sm font-bold whitespace-nowrap transition-colors border-b-2 px-1 ${
                        activeTab === tab.id ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-white'
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
      </div>

      {activeTab === 'health' && renderHealthTab()}
      {activeTab === 'users' && <DataTable data={USERS} columns={userColumns} searchPlaceholder="Search users by name..." />}
      {activeTab === 'companies' && <DataTable data={allCompanies} columns={companyColumns} searchPlaceholder="Search companies..." />}
      {activeTab === 'jobs' && <DataTable data={JOBS} columns={jobColumns} searchPlaceholder="Search active listings..." />}
      {activeTab === 'import' && renderImportTab()}

      {/* Editor Modal */}
      {selectedCompany && (
          <AdminCompanyEditor 
            company={selectedCompany} 
            onClose={() => setSelectedCompany(null)} 
            onSave={handleUpdateCompany}
          />
      )}
    </div>
  );
};