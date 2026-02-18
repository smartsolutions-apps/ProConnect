
import React from 'react';
import { Search, MapPin, Briefcase, Building2, Filter } from 'lucide-react';
import { SearchableDropdown } from '../../components/common/SearchableDropdown';

interface JobFilterBarProps {
    searchTerm: string;
    setSearchTerm: (val: string) => void;
    selectedCity: string;
    setSelectedCity: (val: string) => void;
    selectedCompany: string;
    setSelectedCompany: (val: string) => void;
    selectedIndustry: string;
    setSelectedIndustry: (val: string) => void;
    selectedJobTypes: string[];
    setSelectedJobTypes: (val: string[]) => void;
    easyApplyOnly: boolean;
    setEasyApplyOnly: (val: boolean) => void;
    availableCompanies: string[];
    availableIndustries: string[];
}

const MAJOR_CITIES = ['All Locations', 'Cairo', 'Giza', 'Alexandria', 'Red Sea', 'North Coast', 'Remote'];

export const JobFilterBar: React.FC<JobFilterBarProps> = ({
    searchTerm,
    setSearchTerm,
    selectedCity,
    setSelectedCity,
    selectedCompany,
    setSelectedCompany,
    selectedIndustry,
    setSelectedIndustry,
    selectedJobTypes,
    setSelectedJobTypes,
    easyApplyOnly,
    setEasyApplyOnly,
    availableCompanies,
    availableIndustries
}) => {
    return (
        <div className="bg-white dark:bg-[#1e1e1e] border-b border-gray-200 dark:border-[#2c2c2c] sticky top-0 z-30 px-4 py-3 shadow-sm">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">

                {/* Search Input */}
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search job titles or skills..."
                        className="pl-9 pr-4 py-1.5 bg-gray-100 dark:bg-[#252525] border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-[#1e1e1e] transition-all outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400"
                    />
                </div>

                <div className="h-6 w-px bg-gray-200 dark:bg-[#333] mx-1 hidden sm:block"></div>

                {/* City Dropdown */}
                <div className="w-40 sm:w-48">
                    <SearchableDropdown
                        options={MAJOR_CITIES}
                        value={selectedCity}
                        onChange={setSelectedCity}
                        placeholder="City"
                        icon={<MapPin size={14} />}
                    />
                </div>

                {/* Company Dropdown */}
                <div className="w-40 sm:w-48 hidden md:block">
                    <SearchableDropdown
                        options={availableCompanies}
                        value={selectedCompany}
                        onChange={setSelectedCompany}
                        placeholder="Company"
                        icon={<Building2 size={14} />}
                    />
                </div>

                {/* Industry Dropdown */}
                <div className="w-40 sm:w-48 hidden md:block">
                    <SearchableDropdown
                        options={availableIndustries}
                        value={selectedIndustry}
                        onChange={setSelectedIndustry}
                        placeholder="Industry"
                        icon={<Briefcase size={14} />}
                    />
                </div>

                <div className="flex-1"></div>

                {/* Easy Apply Toggle */}
                <button
                    onClick={() => setEasyApplyOnly(!easyApplyOnly)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all ${easyApplyOnly
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400'
                        : 'bg-white dark:bg-[#1e1e1e] border-gray-300 dark:border-[#333] text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#252525]'
                        }`}
                >
                    Easy Apply Only
                </button>
            </div>
        </div>
    );
};
