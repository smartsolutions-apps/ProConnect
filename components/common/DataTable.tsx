
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
         <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            <input 
                type="text" 
                placeholder={searchPlaceholder || "Search..."}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                onChange={(e) => onSearch && onSearch(e.target.value)}
            />
         </div>
         
         <div className="flex gap-2">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500 disabled:opacity-50">
                <ChevronLeft size={16} />
            </button>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500">
                <ChevronRight size={16} />
            </button>
         </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                    {columns.map((col, idx) => (
                        <th key={idx} className={`px-6 py-4 ${col.className || ''}`}>
                            {col.header}
                        </th>
                    ))}
                    <th className="px-6 py-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                        {columns.map((col, idx) => (
                            <td key={idx} className={`px-6 py-4 text-sm text-gray-700 ${col.className || ''}`}>
                                {col.accessor(item)}
                            </td>
                        ))}
                        <td className="px-6 py-4 text-right">
                             <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                                <MoreVertical size={16} />
                             </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-gray-100 text-xs text-gray-500 flex justify-between">
         <span>Showing 1 to {Math.min(data.length, 10)} of {data.length} results</span>
         <span>Page 1 of 1</span>
      </div>
    </div>
  );
}
