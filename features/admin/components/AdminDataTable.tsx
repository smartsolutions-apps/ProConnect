import React, { useState } from 'react';
import { Edit2, Eye, EyeOff, Trash2, MoreVertical, X, Check } from 'lucide-react';
import { deleteEntity, toggleEntityVisibility, updateEntity } from '../../../services/api/adminService';
import { PostEditorModal } from './PostEditorModal';

interface AdminDataTableProps {
    data: any[];
    collectionName: string;
    columns: { key: string; label: string; render?: (val: any) => React.ReactNode }[];
    onRefresh?: () => void; // Optional callback to trigger re-fetch/update parent state
}

export const AdminDataTable: React.FC<AdminDataTableProps> = ({ data, collectionName, columns, onRefresh }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());
    const [editingItem, setEditingItem] = useState<any>(null);
    const [isEditorOpen, setIsEditorOpen] = useState(false);

    // Filter data locally regarding search, deleted items, and Blacklisted items
    const rawFiltered = data.filter(item =>
        !deletedIds.has(item.id) &&
        item.status !== 'Blacklisted' && // Filter out Blacklisted items
        Object.values(item).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Smart Sort: Pending Review or Hidden items float to top
    const filteredData = [...rawFiltered].sort((a, b) => {
        const aNeedsReview = a.isHidden || a.status === 'Pending Review' ? -1 : 1;
        const bNeedsReview = b.isHidden || b.status === 'Pending Review' ? -1 : 1;

        if (aNeedsReview !== bNeedsReview) return aNeedsReview - bNeedsReview;
        return 0; // Maintain original order otherwise
    });

    // Handlers
    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to blacklist/delete this item? It will be hidden from the platform.')) {
            setProcessingId(id);
            const success = await deleteEntity(collectionName, id);
            if (success) {
                setDeletedIds(prev => new Set(prev).add(id));
                if (onRefresh) onRefresh();
            }
            setProcessingId(null);
        }
    };

    // ... existing handleToggleVisibility and handleEdit ...

    const handleToggleVisibility = async (id: string, currentStatus: boolean) => {
        setProcessingId(id);
        const success = await toggleEntityVisibility(collectionName, id, !currentStatus);
        if (success && onRefresh) onRefresh();
        setProcessingId(null);
    };

    const handleEdit = async (item: any) => {
        if (collectionName === 'posts' || collectionName === 'news') {
            setEditingItem(item);
            setIsEditorOpen(true);
            return;
        }

        // Fallback for other collections (Companies, Jobs)
        const newTitle = window.prompt("Update Title/Name:", item.title || item.name || item.content);
        if (newTitle && newTitle !== (item.title || item.name || item.content)) {
            setProcessingId(item.id);
            const updateField = item.title ? 'title' : item.name ? 'name' : 'content';
            const success = await updateEntity(collectionName, item.id, { [updateField]: newTitle });
            if (success && onRefresh) onRefresh();
            setProcessingId(null);
        }
    };

    const handleSavePost = async (updatedPost: any) => {
        setProcessingId(updatedPost.id);
        const success = await updateEntity(collectionName, updatedPost.id, updatedPost);
        if (success && onRefresh) onRefresh();
        setProcessingId(null);
    };

    return (
        <>
            <div className="bg-white dark:bg-[#1e1e1e] rounded-xl border border-slate-200 dark:border-[#333] overflow-hidden shadow-sm">
                {/* Table Header / Toolbar */}
                <div className="p-4 border-b border-slate-200 dark:border-[#333] flex justify-between items-center bg-slate-50 dark:bg-[#252525]">
                    <h3 className="font-bold text-slate-700 dark:text-slate-200 uppercase text-xs tracking-wider">
                        {collectionName} Management ({filteredData.length})
                    </h3>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-1.5 text-xs rounded-md border border-slate-300 dark:border-[#444] bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-[#252525] text-slate-500 dark:text-slate-400 font-medium border-b border-slate-200 dark:border-[#333]">
                            <tr>
                                {columns.map((col) => (
                                    <th key={col.key} className="px-6 py-3 whitespace-nowrap">{col.label}</th>
                                ))}
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-[#333]">
                            {filteredData.map((item) => {
                                // Determine row background based on status
                                let rowClass = "hover:bg-slate-50 dark:hover:bg-[#252525] transition-colors";
                                if (item.status === 'Pending Review') rowClass = "bg-amber-50 dark:bg-amber-900/10 hover:bg-amber-100 dark:hover:bg-amber-900/20";
                                else if (item.isHidden) rowClass = "opacity-60 grayscale bg-slate-100 dark:bg-[#151515]";

                                return (
                                    <tr
                                        key={item.id}
                                        className={rowClass}
                                    >
                                        {columns.map((col) => (
                                            <td key={col.key} className="px-6 py-3 text-slate-700 dark:text-slate-300 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                                                {col.render ? col.render(item[col.key]) : (item[col.key] || item.name || item.title || item.content || '-')}
                                                {processingId === item.id && <span className="ml-2 text-xs text-indigo-500 animate-pulse">Processing...</span>}
                                            </td>
                                        ))}
                                        <td className="px-6 py-3 text-right flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                                                title="Quick Edit"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleToggleVisibility(item.id, item.isHidden)}
                                                className={`p-1.5 rounded transition-colors ${item.isHidden ? 'text-slate-400 hover:text-slate-600' : 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20'}`}
                                                title={item.isHidden ? "Unhide" : "Hide (Soft Delete)"}
                                            >
                                                {item.isHidden ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded transition-colors"
                                                title="Delete Permanently"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {filteredData.length === 0 && (
                                <tr>
                                    <td colSpan={columns.length + 1} className="px-6 py-8 text-center text-slate-400">
                                        No records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <PostEditorModal
                isOpen={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
                post={editingItem}
                onSave={handleSavePost}
            />
        </>
    );
};
