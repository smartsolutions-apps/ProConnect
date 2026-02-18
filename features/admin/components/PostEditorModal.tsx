import React, { useState, useEffect } from 'react';
import { X, Sparkles, Save, Image as ImageIcon } from 'lucide-react';
import { rewriteNewsArticle } from '../../../services/api/geminiService';

interface PostEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    post: any;
    onSave: (updatedPost: any) => Promise<void>;
}

export const PostEditorModal: React.FC<PostEditorModalProps> = ({ isOpen, onClose, post, onSave }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [sourceUrl, setSourceUrl] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (post) {
            setTitle(post.title || post.snippet || '');
            setContent(post.content || post.description || '');
            setImageUrl(post.imageUrl || post.image || '');
            setSourceUrl(post.url || post.link || '');
        }
    }, [post]);

    if (!isOpen) return null;

    const handleRegenerate = async () => {
        setIsGenerating(true);
        try {
            // Use existing snippet or title + url as context
            const context = title + (sourceUrl ? ` (${sourceUrl})` : '');
            const newContent = await rewriteNewsArticle(title, context, 'General');
            setContent(newContent);
        } catch (error) {
            console.error("Failed to regenerate content", error);
            alert("Failed to regenerate content. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await onSave({
                ...post,
                title,
                content,
                imageUrl,
                url: sourceUrl
            });
            onClose();
        } catch (error) {
            console.error("Failed to save post", error);
            alert("Failed to save changes.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-[#1e1e1e] w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-[#333] flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-[#333] flex justify-between items-center bg-slate-50 dark:bg-[#252525]">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <EditIcon className="w-5 h-5 text-indigo-500" />
                        Master Content Editor
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Left Column: Media */}
                        <div className="md:col-span-1 space-y-4">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Visual Asset</label>
                            <div className="aspect-video bg-slate-100 dark:bg-[#151515] rounded-lg border-2 border-dashed border-slate-300 dark:border-[#444] flex items-center justify-center overflow-hidden relative group">
                                {imageUrl ? (
                                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300?text=Error')} />
                                ) : (
                                    <div className="text-center p-4">
                                        <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                        <span className="text-xs text-slate-500">No Image Preview</span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Image URL</label>
                                <input
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 dark:border-[#444] bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        {/* Right Column: Data */}
                        <div className="md:col-span-2 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title / Headline</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 dark:border-[#444] bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium"
                                    placeholder="Enter engaging headline..."
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-end mb-1">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Content Body</label>
                                    <button
                                        onClick={handleRegenerate}
                                        disabled={isGenerating}
                                        className="text-xs flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Sparkles size={14} />
                                        {isGenerating ? 'Regenerating...' : 'Regenerate with AI'}
                                    </button>
                                </div>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows={8}
                                    className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 dark:border-[#444] bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent leading-relaxed scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700"
                                    placeholder="Post content goes here..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Source URL</label>
                                <input
                                    type="text"
                                    value={sourceUrl}
                                    onChange={(e) => setSourceUrl(e.target.value)}
                                    className="w-full px-3 py-2 text-xs font-mono rounded-md border border-slate-300 dark:border-[#444] bg-slate-50 dark:bg-[#151515] text-slate-600 dark:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent truncated"
                                    placeholder="https://source.com/article..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 dark:border-[#333] bg-slate-50 dark:bg-[#252525] flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#333] rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <Save size={16} />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Helper Icon
const EditIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);
