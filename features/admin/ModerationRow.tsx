import React, { useState } from 'react';
import { Eye, EyeOff, Shield, ShieldAlert, Edit, Ban, CheckCircle2 } from 'lucide-react';
import { OmniResult } from '../../hooks/useOmniSearch';
import { CompanyLogo } from '../../components/ui/CompanyLogo';

interface ModerationRowProps {
    item: OmniResult;
    onView?: () => void;
}

export const ModerationRow: React.FC<ModerationRowProps> = ({ item, onView }) => {
    // Local state for immediate UI feedback
    const [isHidden, setIsHidden] = useState(false);
    const [isSuspended, setIsSuspended] = useState(false);
    const [isVerified, setIsVerified] = useState(item.status === 'Verified');

    const handleToggleHide = () => setIsHidden(!isHidden);
    const handleToggleSuspend = () => setIsSuspended(!isSuspended);
    const handleToggleVerify = () => setIsVerified(!isVerified);

    const getBadgeColor = (type: string) => {
        switch (type) {
            case 'user': return 'bg-blue-100 text-blue-700';
            case 'company': return 'bg-purple-100 text-purple-700';
            case 'job': return 'bg-green-100 text-green-700';
            case 'post': return 'bg-orange-100 text-orange-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className={`group grid grid-cols-12 items-center px-4 py-4 bg-white dark:bg-[#1e1e1e] border-b border-slate-100 dark:border-[#2c2c2c] transition-colors ${isHidden ? 'opacity-50 grayscale' : ''}`}>

            {/* 1. Entity Info (Span 4) */}
            <div className="col-span-12 md:col-span-4 flex items-center gap-4">
                <div className="relative">
                    <CompanyLogo
                        companyName={item.title}
                        domain={(item.data as any).domain}
                        sizeClass="w-10 h-10"
                        className="border border-slate-200 dark:border-[#444]"
                    />
                    {isSuspended && (
                        <div className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full p-0.5">
                            <Ban size={12} />
                        </div>
                    )}
                </div>

                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">{item.title}</h4>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ${getBadgeColor(item.type)}`}>
                            {item.type}
                        </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{item.subtitle}</p>
                </div>
            </div>

            {/* 2. Location / Industry (Span 3) */}
            <div className="hidden md:flex col-span-3 items-center text-sm text-slate-600 dark:text-slate-300">
                {item.type === 'company' && (item.data as any).industry ? (
                    <span className="truncate">{(item.data as any).industry}</span>
                ) : item.type === 'job' && (item.data as any).location ? (
                    <span className="truncate">{(item.data as any).location}</span>
                ) : (
                    <span className="text-slate-400 italic">--</span>
                )}
            </div>

            {/* 3. Status (Span 2) */}
            <div className="hidden md:flex col-span-2 justify-center">
                {isSuspended ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                        <Ban size={12} /> Suspended
                    </span>
                ) : isHidden ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                        <EyeOff size={12} /> Hidden
                    </span>
                ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <CheckCircle2 size={12} /> Active
                    </span>
                )}
            </div>

            {/* 4. Source (Span 2) */}
            <div className="hidden md:flex col-span-2 items-center text-xs text-slate-500">
                {(item.data as any).source ? (
                    <span className="bg-slate-100 dark:bg-[#333] px-2 py-1 rounded text-slate-600 dark:text-slate-300">
                        {(item.data as any).source}
                    </span>
                ) : (
                    <span className="opacity-50">Local DB</span>
                )}
            </div>

            {/* 5. Actions (Span 1) */}
            <div className="col-span-12 md:col-span-1 flex items-center justify-end gap-1 mt-2 md:mt-0">
                {/* Verify Toggle (Only for User/Company) */}
                {(item.type === 'user' || item.type === 'company') && (
                    <button
                        onClick={handleToggleVerify}
                        title={isVerified ? "Unverify" : "Verify"}
                        className={`p-1.5 rounded-lg transition-colors ${isVerified
                                ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                            }`}
                    >
                        <Shield size={16} fill={isVerified ? "currentColor" : "none"} />
                    </button>
                )}

                {/* View Detail Button - The 'Eye' */}
                <button
                    onClick={onView}
                    title="View Details"
                    className="p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#333] hover:text-blue-600 rounded-lg transition-colors"
                >
                    <Eye size={16} />
                </button>

                {/* Hide Toggle */}
                <button
                    onClick={handleToggleHide}
                    title={isHidden ? "Show" : "Hide"}
                    className="p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#333] hover:text-slate-600 rounded-lg transition-colors"
                >
                    {isHidden ? <EyeOff size={16} /> : <EyeOff size={16} className="opacity-50" />}
                </button>

                {/* Edit Button */}
                <button
                    title="Edit Data"
                    className="p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#333] hover:text-slate-600 rounded-lg transition-colors"
                >
                    <Edit size={16} />
                </button>

                {/* Suspend Button (Destructive - Amber) */}
                {(item.type === 'user' || item.type === 'company') && (
                    <button
                        onClick={handleToggleSuspend}
                        title={isSuspended ? "Reactivate" : "Suspend"}
                        className={`p-1.5 rounded-lg transition-colors ${isSuspended
                                ? 'bg-amber-100 text-amber-700'
                                : 'text-slate-400 hover:bg-amber-50 hover:text-amber-600'
                            }`}
                    >
                        <Ban size={16} />
                    </button>
                )}
            </div>
        </div>
    );
};
