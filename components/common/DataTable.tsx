
import React from 'react';
import { Search, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';

export interface Column<T> {
  header: string;
  accessor: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  onSearch?: (term: string) => void;
}

export function DataTable<T extends { id: string }>({ data, columns, searchPlaceholder, onSearch }: DataTableProps<T>) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm border border-slate-200 dark:border-[#2c2c2c] overflow-hidden text-slate-900 dark:text-[#e3e3e3]">
      {/* Table Toolbar */}
      <div className="p-4 border-b border-gray-100 dark:border-[#2c2c2c] flex flex-col sm:flex-row justify-between items-center gap-4">
         <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            <input 
                type="text" 
                placeholder={searchPlaceholder || "Search..."}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-[#2d2d2d] border border-gray-200 dark:border-[#333333] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white"
                onChange={(e) => onSearch && onSearch(e.target.value)}
            />
         </div>
         
         <div className="flex gap-2">
            <button className="p-2 border border-gray-200 dark:border-[#333333] rounded-lg hover:bg-gray-50 dark:hover:bg-[#2d2d2d] text-gray-500 disabled:opacity-50">
                <ChevronLeft size={16} />
            </button>
            <button className="p-2 border border-gray-200 dark:border-[#333333] rounded-lg hover:bg-gray-50 dark:hover:bg-[#2d2d2d] text-gray-500">
                <ChevronRight size={16} />
            </button>
         </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-gray-50 dark:bg-[#252525] border-b border-gray-200 dark:border-[#2c2c2c] text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold tracking-wider">
                    {columns.map((col, idx) => (
                        <th key={idx} className={`px-6 py-4 ${col.className || ''}`}>
                            {col.header}
                        </th>
                    ))}
                    <th className="px-6 py-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#2c2c2c]">
                {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-[#252525]/50 transition-colors group">
                        {columns.map((col, idx) => (
                            <td key={idx} className={`px-6 py-4 text-sm text-gray-700 dark:text-gray-300 ${col.className || ''}`}>
                                {col.accessor(item)}
                            </td>
                        ))}
                        <td className="px-6 py-4 text-right">
                             <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-[#333]">
                                <MoreVertical size={16} />
                             </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-gray-100 dark:border-[#2c2c2c] text-xs text-gray-500 flex justify-between">
         <span>Showing 1 to {Math.min(data.length, 10)} of {data.length} results</span>
         <span>Page 1 of 1</span>
      </div>
    </div>
  );
}
