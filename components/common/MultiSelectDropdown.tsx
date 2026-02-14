
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';

interface MultiSelectDropdownProps {
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Select...",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleOption = (option: string) => {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter(v => v !== option));
    } else {
      onChange([...selectedValues, option]);
    }
  };

  const removeValue = (e: React.MouseEvent, value: string) => {
    e.stopPropagation();
    onChange(selectedValues.filter(v => v !== value));
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full min-h-[38px] flex items-center justify-between px-3 py-1.5 bg-gray-50 dark:bg-[#2d2d2d] border border-gray-200 dark:border-[#333333] rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-[#3d3d3d] focus:ring-1 focus:ring-indigo-500 transition-colors"
      >
        <div className="flex flex-wrap gap-1 max-w-[calc(100%-20px)]">
          {selectedValues.length === 0 ? (
            <span className="text-sm text-gray-500 dark:text-gray-400 py-0.5 select-none">{placeholder}</span>
          ) : (
            selectedValues.map(val => (
              <span key={val} className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-medium rounded-md animate-in fade-in zoom-in-95 duration-75">
                {val}
                <X size={12} className="cursor-pointer hover:text-indigo-900 dark:hover:text-indigo-100" onClick={(e) => removeValue(e, val)} />
              </span>
            ))
          )}
        </div>
        <ChevronDown size={16} className={`text-gray-500 flex-shrink-0 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full min-w-[200px] mt-1 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333333] rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 left-0">
          <div className="max-h-60 overflow-y-auto p-1">
            {options.map((option) => {
              const isSelected = selectedValues.includes(option);
              return (
                <div
                  key={option}
                  className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer rounded-md hover:bg-gray-50 dark:hover:bg-[#2d2d2d] transition-colors ${isSelected ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300'}`}
                  onClick={() => toggleOption(option)}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e1e1e]'}`}>
                    {isSelected && <Check size={10} className="text-white" />}
                  </div>
                  {option}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
