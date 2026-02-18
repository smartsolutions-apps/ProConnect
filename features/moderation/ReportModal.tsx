import React, { useState } from 'react';
import { Flag, X, AlertTriangle } from 'lucide-react';

interface ReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    entityId: string;
    entityType: 'job' | 'company' | 'user';
    entityTitle: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, entityId, entityType, entityTitle }) => {
    const [reason, setReason] = useState('Spam');
    const [details, setDetails] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Report Submitted:', { entityId, entityType, reason, details });
            setIsSubmitting(false);
            setIsSuccess(true);

            // Auto close after success
            setTimeout(() => {
                onClose();
                // Reset state after close
                setTimeout(() => {
                    setIsSuccess(false);
                    setReason('Spam');
                    setDetails('');
                }, 300);
            }, 1500);
        }, 1000);
    };

    if (isSuccess) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] backdrop-blur-sm p-4">
                <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl border border-slate-100 dark:border-[#333]">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Flag size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Report Received</h3>
                    <p className="text-slate-500 dark:text-slate-400">
                        Thank you for keeping our community safe. We will review this report shortly.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 dark:border-[#333] overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-slate-100 dark:border-[#333] flex items-center justify-between bg-slate-50 dark:bg-[#252525]">
                    <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <AlertTriangle size={18} className="text-amber-500" />
                        Report Content
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-slate-200 dark:hover:bg-[#333] rounded-full transition-colors text-slate-500">
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-3 rounded-lg">
                        <p className="text-xs text-amber-800 dark:text-amber-200">
                            You are reporting <span className="font-bold">{entityTitle}</span> ({entityType}).
                            Abuse of the reporting system may lead to account suspension.
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Reason</label>
                        <select
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full p-3 rounded-xl border border-slate-200 dark:border-[#444] bg-white dark:bg-[#2d2d2d] focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                        >
                            <option value="Spam">Spam regarding services or products</option>
                            <option value="Fake Profile">Fake Profile or Impersonation</option>
                            <option value="Inappropriate Content">Inappropriate or Offensive Content</option>
                            <option value="Scam">Scam, Phishing, or Fraud</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Additional Details</label>
                        <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder="Please provide specific details to help us understand the issue..."
                            className="w-full p-3 rounded-xl border border-slate-200 dark:border-[#444] bg-white dark:bg-[#2d2d2d] focus:ring-2 focus:ring-blue-500 outline-none transition-shadow min-h-[100px] text-sm resize-none"
                            required
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 rounded-xl font-bold uppercase tracking-wide text-white transition-all
                                ${isSubmitting
                                    ? 'bg-slate-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none'
                                }`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Report'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
