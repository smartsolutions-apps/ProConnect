
import React, { useState } from 'react';
import { Package, User, CheckCircle2, AlertTriangle, XCircle, Search, RefreshCw, Tablet, Shirt, Ticket } from 'lucide-react';
import { ASSETS, USERS } from '../../data';
import { Asset, AssetStatus } from '../../types';

export const AssetManager: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>(ASSETS);
  const [filter, setFilter] = useState<'ALL' | AssetStatus>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAssets = assets.filter(asset => {
    const matchesFilter = filter === 'ALL' || asset.status === filter;
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          asset.assignedToName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleReturn = (id: string) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, status: 'RETURNED', lastUpdated: 'Just now' } : a));
  };

  const handleMarkLost = (id: string) => {
    if (confirm("Mark this item as LOST? This will deduct the cost from the user's wallet.")) {
        setAssets(prev => prev.map(a => a.id === id ? { ...a, status: 'LOST', lastUpdated: 'Just now' } : a));
    }
  };

  const getIcon = (type: string) => {
    if (type === 'Uniform') return <Shirt size={16} />;
    if (type === 'Tech') return <Tablet size={16} />;
    if (type === 'Access') return <Ticket size={16} />;
    return <Package size={16} />;
  };

  const getStatusBadge = (status: AssetStatus) => {
    switch(status) {
        case 'AVAILABLE': return <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">Available</span>;
        case 'ASSIGNED': return <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full font-bold">Assigned</span>;
        case 'RETURNED': return <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full font-bold">Returned</span>;
        case 'LOST': return <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold">Lost</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Package className="text-brand-600" /> Inventory Control
                </h2>
                <p className="text-sm text-gray-500">Track uniforms, badges, and devices.</p>
            </div>
            
            <div className="flex gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
                {(['ALL', 'ASSIGNED', 'AVAILABLE', 'LOST'] as const).map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${filter === f ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>
        </div>

        <div className="relative mb-6">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input 
                type="text" 
                placeholder="Search items or users..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500"
            />
        </div>

        <div className="grid grid-cols-1 gap-3">
            {filteredAssets.map(asset => (
                <div key={asset.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${asset.status === 'ASSIGNED' ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-600'}`}>
                            {getIcon(asset.type)}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className="font-bold text-gray-900">{asset.name}</h4>
                                {getStatusBadge(asset.status)}
                            </div>
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                {asset.assignedToName ? (
                                    <>
                                        With: <span className="font-bold text-gray-700">{asset.assignedToName}</span> •
                                    </>
                                ) : (
                                    <>Location: Warehouse A •</>
                                )}
                                <span className="text-gray-400">{asset.lastUpdated}</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {asset.status === 'ASSIGNED' && (
                            <>
                                <button 
                                    onClick={() => handleReturn(asset.id)}
                                    className="px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-green-100 transition-colors"
                                >
                                    <CheckCircle2 size={14} /> Return
                                </button>
                                <button 
                                    onClick={() => handleMarkLost(asset.id)}
                                    className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                                    title="Report Lost"
                                >
                                    <AlertTriangle size={16} />
                                </button>
                            </>
                        )}
                        {asset.status === 'AVAILABLE' && (
                            <button className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-gray-800 transition-colors">
                                Assign
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
