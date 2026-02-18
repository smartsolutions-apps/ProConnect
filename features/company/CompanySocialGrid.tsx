import React from 'react';
import { Heart, MessageCircle, Instagram } from 'lucide-react';
import { Company } from '../../types';

interface CompanySocialGridProps {
    company: Company;
}



export const CompanySocialGrid: React.FC<CompanySocialGridProps> = ({ company }) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                        <Instagram size={18} />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">Instagram Feed</h3>
                </div>
            </div>

            <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-[#333] bg-slate-50/50 dark:bg-[#252525]/50 p-8 text-center">
                <div className="w-16 h-16 bg-white dark:bg-[#2d2d2d] rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                    <Instagram size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Connect Instagram</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6 text-sm">
                    Link your company's Instagram account to automatically display your latest posts, culture, and updates here.
                </p>
                <button className="px-6 py-2.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white font-bold rounded-xl transition-transform hover:scale-105 shadow-md flex items-center justify-center gap-2 mx-auto text-sm">
                    <Instagram size={16} />
                    Connect Account
                </button>
            </div>
        </div>
    );
};
