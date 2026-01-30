
import React, { useState } from 'react';
import { Activity, Users, Building2, FileText, AlertTriangle, ShieldCheck } from 'lucide-react';
import { DataTable, Column } from '../../components/common/DataTable';
import { USERS, COMPANIES, JOBS } from '../../data';
import { User, Company, Job } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'health' | 'users' | 'companies' | 'jobs'>('health');

  // Stats Logic
  const totalUsers = USERS.length + 142; // Simulated extra users
  const totalCompanies = COMPANIES.length + 15; // Simulated extra
  const totalJobs = JOBS.length + 56;
  const activeAlerts = 3;

  const renderHealthTab = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
           { label: 'Total Users', val: totalUsers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
           { label: 'Verified Companies', val: totalCompanies, icon: Building2, color: 'text-purple-600', bg: 'bg-purple-50' },
           { label: 'Active Jobs', val: totalJobs, icon: FileText, color: 'text-green-600', bg: 'bg-green-50' },
           { label: 'Content Alerts', val: activeAlerts, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                    <stat.icon className={stat.color} size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">{stat.val}</h3>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
                </div>
            </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Recent System Activity</h3>
            <div className="space-y-4">
                {[
                    { msg: "New company registration: Robosta", time: "2m ago", type: "info" },
                    { msg: "User reported job: 'Scam listing'", time: "15m ago", type: "alert" },
                    { msg: "System backup completed", time: "1h ago", type: "success" },
                    { msg: "High traffic alert: Cairo Region", time: "3h ago", type: "warning" }
                ].map((log, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                        <div className={`w-2 h-2 rounded-full ${log.type === 'alert' ? 'bg-red-500' : log.type === 'success' ? 'bg-green-500' : log.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                        <span className="text-gray-700 flex-1">{log.msg}</span>
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
                    <div className="bg-blue-500 h-full w-[42%]"></div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );

  // --- Column Definitions ---

  const userColumns: Column<User>[] = [
    { header: "User", accessor: (u) => (
        <div className="flex items-center gap-3">
            <img src={u.avatarUrl} className="w-8 h-8 rounded-full bg-gray-100" />
            <div>
                <p className="font-bold text-gray-900">{u.name}</p>
                <p className="text-xs text-gray-500">{u.id}</p>
            </div>
        </div>
    )},
    { header: "Role/Headline", accessor: (u) => u.headline },
    { header: "Location", accessor: (u) => u.location },
    { header: "Status", accessor: () => <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">Active</span> }
  ];

  const companyColumns: Column<Company>[] = [
    { header: "Company", accessor: (c) => (
        <div className="flex items-center gap-3">
            <img src={c.logoUrl} className="w-8 h-8 rounded bg-white border border-gray-100" />
            <div>
                <p className="font-bold text-gray-900">{c.name}</p>
                <p className="text-xs text-gray-500">{c.industry}</p>
            </div>
        </div>
    )},
    { header: "HQ Location", accessor: (c) => c.location },
    { header: "Verification", accessor: () => <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-bold flex items-center w-fit gap-1"><ShieldCheck size={10}/> Verified</span> }
  ];

  const jobColumns: Column<Job>[] = [
    { header: "Job Title", accessor: (j) => <span className="font-medium text-gray-900">{j.title}</span> },
    { header: "Company", accessor: (j) => j.companyName },
    { header: "Type", accessor: (j) => j.type },
    { header: "Applicants", accessor: (j) => j.applicantsCount }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={20} className="text-red-600" />
            <h2 className="text-lg font-bold text-gray-900">Super Admin Console</h2>
        </div>
        <div className="flex gap-4 border-b border-gray-100">
            {['health', 'users', 'companies', 'jobs'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`pb-3 text-sm font-medium capitalize transition-colors border-b-2 ${
                        activeTab === tab ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-800'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
      </div>

      {activeTab === 'health' && renderHealthTab()}
      {activeTab === 'users' && <DataTable data={USERS} columns={userColumns} searchPlaceholder="Search users by name..." />}
      {activeTab === 'companies' && <DataTable data={COMPANIES} columns={companyColumns} searchPlaceholder="Search companies..." />}
      {activeTab === 'jobs' && <DataTable data={JOBS} columns={jobColumns} searchPlaceholder="Search active listings..." />}
    </div>
  );
};
