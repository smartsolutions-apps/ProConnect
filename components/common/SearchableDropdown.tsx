
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';

interface SearchableDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm('');
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setSearchTerm('');
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-[#2d2d2d] border border-gray-200 dark:border-[#333333] rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-[#3d3d3d] focus:ring-1 focus:ring-indigo-500 transition-colors"
      >
        <span className={`text-sm truncate select-none ${value ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
          {value || placeholder}
        </span>
        <div className="flex items-center gap-1 ml-2">
          {value && (
            <div role="button" onClick={clearSelection} className="p-0.5 hover:bg-gray-200 dark:hover:bg-[#444] rounded-full transition-colors">
              <X size={14} className="text-gray-400" />
            </div>
          )}
          <ChevronDown size={16} className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full min-w-[200px] mt-1 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333333] rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 left-0">
          <div className="p-2 border-b border-gray-100 dark:border-[#333333] bg-gray-50 dark:bg-[#2d2d2d]">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
              <input
                type="text"
                className="w-full pl-8 pr-3 py-1.5 text-sm bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333333] rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-400 dark:text-white"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto">
            <div
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors ${value === '' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 font-medium' : 'text-gray-600 dark:text-gray-300'}`}
              onClick={() => handleSelect('')}
            >
              {placeholder === 'City' ? 'All Locations' : placeholder === 'Company' ? 'All Companies' : placeholder === 'Industry' ? 'All Industries' : 'All'}
            </div>
            {filteredOptions.map((option) => (
              <div
                key={option}
                className={`px-3 py-2 text-sm cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors ${value === option ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <div className="px-3 py-3 text-sm text-center text-gray-400">
                No matches found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
