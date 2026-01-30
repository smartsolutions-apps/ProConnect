
import React from 'react';
import { Transaction } from '../../types';
import { ArrowDownLeft, ArrowUpRight, Clock, CheckCircle2, XCircle, Smartphone, Landmark, Zap, Store } from 'lucide-react';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle2 size={14} className="text-green-600" />;
      case 'PENDING': return <Clock size={14} className="text-amber-600" />;
      case 'FAILED': return <XCircle size={14} className="text-red-600" />;
      default: return <Clock size={14} className="text-gray-400" />;
    }
  };

  const getMethodIcon = (method?: string) => {
    if (!method) return <ArrowDownLeft size={16} className="text-green-600" />; // Default Earning
    if (method.includes('Vodafone')) return <Smartphone size={16} className="text-red-600" />;
    if (method.includes('InstaPay')) return <Zap size={16} className="text-purple-600" />;
    if (method.includes('Fawry')) return <Store size={16} className="text-yellow-600" />;
    return <Landmark size={16} className="text-gray-600" />;
  };

  return (
    <div className="space-y-4">
        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Recent Activity</h3>
        
        {transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">No transactions yet.</div>
        ) : (
            <div className="space-y-3">
                {transactions.map((txn) => (
                    <div key={txn.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${txn.type === 'EARNING' ? 'bg-green-50' : 'bg-red-50'}`}>
                                {txn.type === 'EARNING' ? <ArrowDownLeft size={18} className="text-green-600" /> : getMethodIcon(txn.method)}
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">{txn.title}</p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    {getStatusIcon(txn.status)}
                                    <span className={`text-xs font-medium ${txn.status === 'PENDING' ? 'text-amber-600' : 'text-gray-500'}`}>
                                        {txn.status === 'PENDING' ? 'Clearance Pending' : txn.date}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`font-bold ${txn.type === 'EARNING' ? 'text-green-600' : 'text-gray-900'}`}>
                                {txn.type === 'EARNING' ? '+' : ''}{txn.amount} <span className="text-xs">EGP</span>
                            </p>
                            {txn.type === 'WITHDRAWAL' && txn.method && (
                                <p className="text-[10px] text-gray-400">{txn.method}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};
