
import React, { useState } from 'react';
import { ApplicationCard } from './ApplicationCard';
import { MY_APPLICATIONS } from '../../data';
import { Briefcase, ArrowUpDown } from 'lucide-react';

type SortOption = 'newest' | 'oldest' | 'updated';

export const ApplicationsDashboard: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const sortedApplications = [...MY_APPLICATIONS].sort((a, b) => {
    const dateA = new Date(a.appliedDate).getTime();
    const dateB = new Date(b.appliedDate).getTime();
    const updateA = new Date(a.lastUpdateDate).getTime();
    const updateB = new Date(b.lastUpdateDate).getTime();

    switch (sortBy) {
      case 'newest':
        return dateB - dateA;
      case 'oldest':
        return dateA - dateB;
      case 'updated':
        return updateB - updateA;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-50 rounded-lg">
                <Briefcase size={24} className="text-brand-600" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-900">My Applications</h2>
                <p className="text-sm text-gray-500">Track status and manage follow-ups</p>
            </div>
        </div>
        
        <div className="flex items-center gap-2">
            <ArrowUpDown size={16} className="text-gray-500" />
            <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block p-2.5 outline-none cursor-pointer hover:bg-gray-100 transition-colors"
            >
                <option value="newest">Applied: Newest First</option>
                <option value="oldest">Applied: Oldest First</option>
                <option value="updated">Last Update</option>
            </select>
        </div>
      </div>

      <div className="space-y-4">
        {sortedApplications.map(app => (
          <ApplicationCard key={app.id} application={app} />
        ))}
      </div>
    </div>
  );
};
