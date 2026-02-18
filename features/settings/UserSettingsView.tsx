import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeProvider';
import {
    User, Shield, Eye, Bell, Lock, Globe, Moon, ChevronRight,
    LogOut, HelpCircle, FileText, ChevronDown, Sparkles
} from 'lucide-react';
import { ResumeUploader } from '../profile/ResumeUploader';
import { ParsedResume } from '../../services/api/resumeParserService';

// Simple Toggle Component
const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) => (
    <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${checked ? 'bg-green-600' : 'bg-slate-200 dark:bg-slate-700'
            }`}
    >
        <span
            className={`${checked ? 'translate-x-[1.5rem] rtl:-translate-x-[1.5rem]' : 'translate-x-1 rtl:-translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
    </button>
);

export const UserSettingsView: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const [activeTab, setActiveTab] = useState('account');

    // Profile State for "Magic Profile"
    const [profileData, setProfileData] = useState({
        firstName: "Amr",
        lastName: "Elfangary",
        title: "",
        summary: "",
        skills: [] as string[],
        experience: [] as any[]
    });

    const handleResumeParsed = (data: ParsedResume) => {
        setProfileData({
            firstName: data.firstName,
            lastName: data.lastName,
            title: data.title,
            summary: data.summary,
            skills: data.skills,
            experience: data.experience
        });
    };

    const tabs = [
        { id: 'account', label: t('settings.account'), icon: User },
        { id: 'security', label: t('settings.security'), icon: Lock },
        { id: 'visibility', label: t('settings.visibility'), icon: Eye },
        { id: 'privacy', label: t('settings.privacy'), icon: Shield },
        { id: 'ads', label: t('settings.ads'), icon: FileText },
        { id: 'notifications', label: t('settings.notifications'), icon: Bell },
    ];

    const toggleLanguage = () => {
        const newLang = i18n.language === 'ar' ? 'en' : 'ar';
        i18n.changeLanguage(newLang);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#121212] py-8">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-12 gap-8">

                {/* Left Sidebar - Navigation */}
                <div className="col-span-12 md:col-span-3 space-y-2">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white px-3 mb-4">{t('settings.header')}</h2>

                    <nav className="space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors border-l-4 rtl:border-l-0 rtl:border-r-4 ${activeTab === tab.id
                                    ? 'border-indigo-600 text-indigo-600 bg-white dark:bg-[#1e1e1e] shadow-sm'
                                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#252525] hover:text-slate-900 dark:hover:text-slate-200'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    {/* <tab.icon size={18} /> Icon optional based on LinkedIn style, usually text only but icons help */}
                                    {tab.label}
                                </div>
                                {activeTab === tab.id && <ChevronRight size={16} className="rtl:rotate-180" />}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Right Content */}
                <div className="col-span-12 md:col-span-9 space-y-6">

                    {activeTab === 'account' && (
                        <>
                            {/* Resume Parsing Section */}
                            <section className="bg-white dark:bg-[#1e1e1e] rounded-xl border border-slate-200 dark:border-[#333] overflow-hidden mb-6">
                                <div className="p-6 border-b border-slate-100 dark:border-[#2d2d2d] flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10">
                                    <div>
                                        <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300">Magic Profile</h3>
                                        <p className="text-sm text-indigo-600 dark:text-indigo-400">Auto-fill your details with AI.</p>
                                    </div>
                                    <Sparkles className="text-indigo-500" />
                                </div>
                                <div className="p-6">
                                    <ResumeUploader onParseComplete={handleResumeParsed} />
                                </div>
                            </section>

                            {/* Profile Information */}
                            <section className="bg-white dark:bg-[#1e1e1e] rounded-xl border border-slate-200 dark:border-[#333] overflow-hidden">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white px-6 py-4 border-b border-slate-100 dark:border-[#2d2d2d]">
                                    {t('settings.profile_info')}
                                </h3>
                                <div>
                                    <SettingRow
                                        label="Name, location, and industry"
                                        value={`${profileData.firstName} ${profileData.lastName}`}
                                    />
                                    <SettingRow
                                        label="Professional Headline"
                                        value={profileData.title || "Add details"}
                                    />
                                    <SettingRow
                                        label="Summary"
                                        value={profileData.summary ? `${profileData.summary.substring(0, 50)}...` : "Add summary"}
                                    />
                                    <SettingRow label="Personal demographic information" value="Add details" />
                                    <SettingRow label="Verifications" value="Verified" />
                                </div>
                            </section>

                            {/* Extracted Skills & Experience (New Section) */}
                            {profileData.skills.length > 0 && (
                                <section className="bg-white dark:bg-[#1e1e1e] rounded-xl border border-slate-200 dark:border-[#333] overflow-hidden mt-6">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white px-6 py-4 border-b border-slate-100 dark:border-[#2d2d2d]">
                                        Skills & Experience (AI Extracted)
                                    </h3>
                                    <div className="p-6">
                                        <div className="mb-4">
                                            <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">Top Skills</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {profileData.skills.map(skill => (
                                                    <span key={skill} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {profileData.experience.length > 0 && (
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">Recent Experience</h4>
                                                <div className="space-y-3">
                                                    {profileData.experience.map((exp, idx) => (
                                                        <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                                            <div>
                                                                <p className="font-bold text-slate-900 dark:text-white">{exp.role}</p>
                                                                <p className="text-sm text-slate-500">{exp.company}</p>
                                                            </div>
                                                            <span className="text-xs font-mono text-slate-400">{exp.years}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            )}

                            {/* Display */}
                            <section className="bg-white dark:bg-[#1e1e1e] rounded-xl border border-slate-200 dark:border-[#333] overflow-hidden">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white px-6 py-4 border-b border-slate-100 dark:border-[#2d2d2d]">
                                    {t('settings.display')}
                                </h3>
                                <div>
                                    <div className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-[#252525] transition-colors cursor-pointer group" onClick={toggleTheme}>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('settings.dark_mode')}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-slate-500 dark:text-slate-400">
                                                {theme === 'dark' ? t('settings.on') : t('settings.off')}
                                            </span>
                                            <Toggle checked={theme === 'dark'} onChange={toggleTheme} />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* General Preferences */}
                            <section className="bg-white dark:bg-[#1e1e1e] rounded-xl border border-slate-200 dark:border-[#333] overflow-hidden">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white px-6 py-4 border-b border-slate-100 dark:border-[#2d2d2d]">
                                    {t('settings.general')}
                                </h3>
                                <div>
                                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50 dark:border-[#252525] hover:bg-slate-50 dark:hover:bg-[#252525] transition-colors cursor-pointer group" onClick={toggleLanguage}>
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {t('settings.language')}
                                        </span>
                                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                            <span className="text-sm">{i18n.language === 'ar' ? 'العربية' : 'English'}</span>
                                            <ChevronRight size={16} className="rtl:rotate-180" />
                                        </div>
                                    </div>

                                    <SettingRow label={t('settings.content_lang')} value={i18n.language === 'ar' ? 'العربية' : 'English'} />
                                    <SettingRow
                                        label={t('settings.autoplay')}
                                        customValue={<Toggle checked={true} onChange={() => { }} />}
                                    />
                                    <SettingRow
                                        label={t('settings.profile_photos')}
                                        value="All LinkedIn members"
                                    />
                                </div>
                            </section>

                            {/* Account Management */}
                            <section className="bg-white dark:bg-[#1e1e1e] rounded-xl border border-slate-200 dark:border-[#333] overflow-hidden">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white px-6 py-4 border-b border-slate-100 dark:border-[#2d2d2d]">
                                    {t('settings.account_mgmt')}
                                </h3>
                                <div>
                                    <SettingRow label={t('settings.hibernate')} value="" />
                                    <SettingRow label={t('settings.close_account')} value="" />
                                </div>
                            </section>
                        </>
                    )}

                    {activeTab !== 'account' && (
                        <div className="bg-white dark:bg-[#1e1e1e] rounded-xl border border-slate-200 dark:border-[#333] p-12 text-center">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-[#252525] rounded-full flex items-center justify-center mx-auto mb-4">
                                {/* <Settings className="text-slate-400" size={32} /> */}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Section Under Construction</h3>
                            <p className="text-slate-500 dark:text-slate-400">This setting category is coming soon.</p>
                        </div>
                    )}
                </div>
            </div>

            <footer className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-200 dark:border-[#333] text-center text-slate-500 text-sm">
                <div className="flex justify-center gap-6 mb-4">
                    <a href="#" className="hover:underline">User Agreement</a>
                    <a href="#" className="hover:underline">Privacy Policy</a>
                    <a href="#" className="hover:underline">Community Guidelines</a>
                    <a href="#" className="hover:underline">Cookie Policy</a>
                    <a href="#" className="hover:underline">Copyright Policy</a>
                </div>
                <p>ProConnect Corporation © 2026</p>
            </footer>
        </div>
    );
};

interface SettingRowProps {
    label: string;
    value?: string;
    customValue?: React.ReactNode;
    onClick?: () => void;
}

const SettingRow: React.FC<SettingRowProps> = ({ label, value, customValue, onClick }) => (
    <div
        onClick={onClick}
        className="flex items-center justify-between px-6 py-4 border-b border-slate-50 dark:border-[#252525] last:border-0 hover:bg-slate-50 dark:hover:bg-[#252525] transition-colors cursor-pointer group"
    >
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {label}
        </span>
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            {customValue ? (
                customValue
            ) : (
                <>
                    <span className="text-sm">{value}</span>
                    <ChevronRight size={16} className="rtl:rotate-180" />
                </>
            )}
        </div>
    </div>
);
