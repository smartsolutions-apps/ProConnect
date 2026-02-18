import React, { useState, useEffect } from 'react';
import {
    Sparkles, Zap, Shield, Globe, Activity, Briefcase, User, Search, Lock, WifiOff,
    CheckCircle2, ArrowRight, LayoutDashboard, Terminal, Smartphone, MousePointer2, Database,
    FileText, Users, BarChart3, MessageSquare, Bell, EyeOff, Layers, Cpu, DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';

type TabType = 'companies' | 'seekers' | 'admin';

interface FeatureBullet {
    icon: any;
    text: string;
}

interface Feature {
    title: string;
    subtitle: string;
    bullets: FeatureBullet[];
    visual?: React.ReactNode;
    visualType?: 'dashboard' | 'mobile' | 'stats' | 'chat' | 'doc' | 'network' | 'shield';
}

const FeatureBlock = ({ feature, index, activeTab }: { feature: Feature; index: number; activeTab: TabType }) => {
    const isEven = index % 2 === 0;

    // Theme colors based on tab
    const themeColor = activeTab === 'companies' ? 'blue' : activeTab === 'seekers' ? 'emerald' : 'slate';
    const bgTheme = activeTab === 'companies' ? 'bg-blue-50' : activeTab === 'seekers' ? 'bg-emerald-50' : 'bg-slate-100';
    const textTheme = activeTab === 'companies' ? 'text-blue-600' : activeTab === 'seekers' ? 'text-emerald-600' : 'text-slate-600';

    // Helper to render placeholder visuals for new items
    const renderPlaceholderVisual = (type: string) => {
        switch (type) {
            case 'dashboard':
                return (
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden group">
                        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${themeColor}-500 to-purple-500`}></div>
                        <div className="space-y-4">
                            <div className="flex gap-4 mb-6">
                                <div className={`w-12 h-12 rounded-xl ${bgTheme} flex items-center justify-center`}>
                                    <BarChart3 size={24} className={textTheme} />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-1/3 bg-slate-200 rounded"></div>
                                    <div className="h-3 w-1/2 bg-slate-100 rounded"></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
                                        <div className={`text-xl font-bold ${textTheme}`}>
                                            {i === 1 ? '98%' : i === 2 ? '2.4s' : '15k'}
                                        </div>
                                        <div className="text-xs text-slate-400 mt-1">Metric</div>
                                    </div>
                                ))}
                            </div>
                            <div className="h-32 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden">
                                <div className={`absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-${themeColor}-100/50 to-transparent`}></div>
                                <Activity className={`absolute bottom-4 left-4 ${textTheme} opacity-20`} size={48} />
                            </div>
                        </div>
                    </div>
                );
            case 'mobile':
                return (
                    <div className="relative mx-auto w-64 h-96 bg-slate-900 rounded-[2.5rem] p-4 shadow-2xl border-4 border-slate-800">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-800 rounded-b-xl z-20"></div>
                        <div className="bg-white h-full w-full rounded-[1.5rem] overflow-hidden relative">
                            <div className={`h-32 bg-gradient-to-br from-${themeColor}-500 to-${themeColor}-700 p-4 pt-10 text-white`}>
                                <div className="h-2 w-8 bg-white/30 rounded mb-2"></div>
                                <div className="h-6 w-3/4 bg-white/20 rounded"></div>
                            </div>
                            <div className="p-4 space-y-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex gap-3 items-center p-2 rounded-lg bg-slate-50 border border-slate-100">
                                        <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                                        <div className="flex-1 space-y-1">
                                            <div className="h-2 w-full bg-slate-200 rounded"></div>
                                            <div className="h-2 w-2/3 bg-slate-100 rounded"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'chat':
                return (
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 relative">
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                                <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none text-sm text-slate-600 max-w-[80%]">
                                    Hey! I saw your profile and it looks like a great match.
                                </div>
                            </div>
                            <div className="flex gap-3 justify-end">
                                <div className={`bg-${themeColor}-600 p-3 rounded-2xl rounded-tr-none text-sm text-white max-w-[80%]`}>
                                    Thanks! I'd love to hear more about the role.
                                </div>
                                <div className={`w-8 h-8 rounded-full bg-${themeColor}-100`}></div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                                <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none text-sm text-slate-600 max-w-[80%]">
                                    Are you free for a quick call tomorrow at 2pm?
                                </div>
                            </div>
                            <div className="border-t border-slate-100 pt-3 mt-2 flex gap-2">
                                <div className="h-10 bg-slate-50 rounded-lg flex-1 border border-slate-200"></div>
                                <div className={`w-10 h-10 rounded-lg bg-${themeColor}-600 flex items-center justify-center text-white`}>
                                    <ArrowRight size={16} />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'doc':
                return (
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 relative transform rotate-1 hover:rotate-0 transition-transform duration-500">
                        <div className="absolute top-4 right-4 text-slate-200">
                            <FileText size={48} />
                        </div>
                        <div className="space-y-6">
                            <div className="h-8 w-1/2 bg-slate-800 rounded mb-8"></div>
                            <div className="space-y-3">
                                <div className="h-2 w-full bg-slate-200 rounded"></div>
                                <div className="h-2 w-full bg-slate-200 rounded"></div>
                                <div className="h-2 w-3/4 bg-slate-200 rounded"></div>
                            </div>
                            <div className="pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Signed By</div>
                                    <div className="font-handwriting text-xl text-blue-600">John Doe</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Date</div>
                                    <div className="text-slate-800 font-mono">2026-05-12</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'network':
                return (
                    <div className="bg-slate-900 p-6 rounded-2xl shadow-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center aspect-video">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        <div className="relative z-10 grid grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className={`w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-blue-500' : 'bg-emerald-500'} animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]`}></div>
                            ))}
                        </div>
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                            <line x1="30%" y1="30%" x2="70%" y2="70%" stroke="white" strokeWidth="1" />
                            <line x1="70%" y1="30%" x2="30%" y2="70%" stroke="white" strokeWidth="1" />
                            <circle cx="50%" cy="50%" r="50" stroke="white" strokeWidth="1" fill="none" />
                        </svg>
                    </div>
                );
            case 'stats':
                return (
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 relative">
                        <div className="flex gap-4 items-end h-32 mb-4">
                            {[40, 70, 50, 90, 60, 80].map((h, i) => (
                                <div key={i} className={`flex-1 rounded-t-lg ${i % 2 === 0 ? `bg-${themeColor}-500` : `bg-${themeColor}-200`}`} style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                            <div>
                                <div className="text-sm text-slate-500">Total Growth</div>
                                <div className="text-2xl font-bold text-slate-800">+127%</div>
                            </div>
                            <div className={`p-2 rounded-lg ${bgTheme} ${textTheme}`}>
                                <Activity size={20} />
                            </div>
                        </div>
                    </div>
                );
            case 'shield':
                return (
                    <div className="bg-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-800 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-6 relative">
                            <div className="absolute inset-0 border-2 border-slate-700 rounded-full animate-ping opacity-50"></div>
                            <Shield size={32} className="text-emerald-400" />
                        </div>
                        <h3 className="text-emerald-400 font-bold mb-2">SECURE & ENCRYPTED</h3>
                        <p className="text-slate-400 text-sm">End-to-end protection enabled</p>
                    </div>
                );
            default:
                // Default fallback card
                return (
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center aspect-video">
                        <div className={`p-6 rounded-full ${bgTheme}`}>
                            <Sparkles size={48} className={textTheme} />
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className={`w-full py-20 md:py-32 ${isEven ? 'bg-white dark:bg-[#0a0a0a]' : 'bg-slate-50 dark:bg-[#111]'}`}>
            <div className={`max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 md:gap-24 transition-all duration-700 ${!isEven ? 'md:flex-row-reverse' : ''}`}>
                {/* Text Side */}
                <div className="flex-1 space-y-8 animate-in slide-in-from-bottom-12 fade-in duration-700">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                            {feature.title}
                        </h2>
                        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                            {feature.subtitle}
                        </p>
                    </div>

                    <ul className="space-y-4">
                        {feature.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-center gap-4 group">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${bgTheme} ${textTheme} group-hover:scale-110 duration-300`}>
                                    <bullet.icon size={20} />
                                </div>
                                <span className="text-base md:text-lg font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                    {bullet.text}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Visual Side */}
                <div className="flex-1 w-full relative group perspective-1000 animate-in zoom-in fade-in duration-700">
                    <div className="absolute -inset-4 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative transform md:group-hover:rotate-y-2 md:group-hover:rotate-x-2 transition-transform duration-500 preserve-3d">
                        {feature.visual || (feature.visualType && renderPlaceholderVisual(feature.visualType))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const PlatformTour: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('companies');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const companiesFeatures: Feature[] = [
        {
            title: "✨ AI Magic Auto-Write",
            subtitle: "Never stare at a blank job description again.",
            bullets: [
                { icon: Sparkles, text: "One-click Gemini AI generation" },
                { icon: Briefcase, text: "+1000 dynamic roles supported" },
                { icon: Zap, text: "Instant professional formatting" }
            ],
            visual: (
                <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <div className="flex gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                            <Briefcase size={20} className="text-slate-400" />
                        </div>
                        <div className="flex-1">
                            <div className="h-4 w-24 bg-slate-200 rounded mb-2"></div>
                            <div className="h-3 w-40 bg-slate-100 rounded"></div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between group-hover:border-blue-300 transition-colors">
                            <span className="text-sm text-slate-500 font-mono">Senior React Dev...</span>
                            <button className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-bold">
                                <Sparkles size={12} /> Auto-Write
                            </button>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 animate-pulse">
                            <div className="h-2 bg-slate-200 rounded w-3/4 mb-2"></div>
                            <div className="h-2 bg-slate-200 rounded w-full mb-2"></div>
                            <div className="h-2 bg-slate-200 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Icon-Driven, Noise-Free UI",
            subtitle: "Replaces massive text walls with visual indicators.",
            bullets: [
                { icon: MousePointer2, text: "Visual-first job scanning" },
                { icon: Smartphone, text: "Mobile-optimized layouts" },
                { icon: Shield, text: "Verified Brandfetch logos" }
            ],
            visual: (
                <div className="bg-slate-900 p-6 rounded-2xl shadow-2xl border border-slate-800 relative">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-xs text-slate-500">ProConnect UI</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col items-center text-center">
                            <Briefcase className="text-blue-400 mb-2" />
                            <div className="text-xs text-slate-300 font-bold">Full-Time</div>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col items-center text-center">
                            <Globe className="text-emerald-400 mb-2" />
                            <div className="text-xs text-slate-300 font-bold">Remote</div>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col items-center text-center">
                            <Zap className="text-amber-400 mb-2" />
                            <div className="text-xs text-slate-300 font-bold">Easy Apply</div>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col items-center text-center">
                            <Shield className="text-rose-400 mb-2" />
                            <div className="text-xs text-slate-300 font-bold">Verified</div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "AI Talent Matchmaking",
            subtitle: "Stop reading resumes. Let AI score them.",
            bullets: [
                { icon: Zap, text: "Instant candidate scoring" },
                { icon: Activity, text: "Semantic skill matching" },
                { icon: Shield, text: "Bias reduction algorithms" }
            ],
            visualType: 'dashboard'
        },
        {
            title: "Employer Branding Hub",
            subtitle: "Your premium company storefront.",
            bullets: [
                { icon: Globe, text: "High-res Brandfetch integration" },
                { icon: Users, text: "Custom culture galleries" },
                { icon: LayoutDashboard, text: "Active job showcases" }
            ],
            visualType: 'dashboard'
        },
        {
            title: "Seamless Applicant Tracking",
            subtitle: "A built-in Kanban board for hiring.",
            bullets: [
                { icon: Layers, text: "Drag-and-drop pipelines" },
                { icon: CheckCircle2, text: "One-click rejection/approval" },
                { icon: Activity, text: "Interview scheduling" }
            ],
            visualType: 'dashboard'
        },
        {
            title: "Market Salary Analytics",
            subtitle: "Know what the market is paying.",
            bullets: [
                { icon: DollarSign, text: "Live salary benchmarks" },
                { icon: BarChart3, text: "Competitor analysis" },
                { icon: Activity, text: "Demand forecasting" }
            ],
            visualType: 'stats'
        },
        {
            title: "Collaborative Hiring",
            subtitle: "Hire as a team, effortlessly.",
            bullets: [
                { icon: MessageSquare, text: "Shared candidate notes" },
                { icon: Users, text: "Team voting" },
                { icon: Lock, text: "Granular permission roles" }
            ],
            visualType: 'chat'
        },
        {
            title: "Automated Offer Generation",
            subtitle: "From interview to contract in seconds.",
            bullets: [
                { icon: Sparkles, text: "Smart PDF generation" },
                { icon: FileText, text: "E-signature ready" },
                { icon: Shield, text: "Legally compliant templates" }
            ],
            visualType: 'doc'
        },
        {
            title: "Targeted Real Estate Distribution",
            subtitle: "Zero spam. Only verified professionals.",
            bullets: [
                { icon: Briefcase, text: "Niche-specific algorithms" },
                { icon: Users, text: "High-intent candidate pools" },
                { icon: Shield, text: "Verified professional checks" }
            ],
            visualType: 'network'
        },
        {
            title: "Hiring ROI Dashboard",
            subtitle: "Metrics that matter.",
            bullets: [
                { icon: Activity, text: "Time-to-hire tracking" },
                { icon: DollarSign, text: "Cost-per-hire analytics" },
                { icon: BarChart3, text: "Source attribution" }
            ],
            visualType: 'stats'
        }
    ];

    const seekersFeatures: Feature[] = [
        {
            title: "Live AI Intelligence Feed",
            subtitle: "Stay ahead of the market every single day.",
            bullets: [
                { icon: Activity, text: "Real-time construction updates" },
                { icon: Globe, text: "Global event tracking" },
                { icon: Sparkles, text: "AI-rewritten market insights" }
            ],
            visual: (
                <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 relative">
                    <div className="absolute top-4 right-4 flex gap-1">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                        <span className="text-xs font-bold text-red-500">LIVE</span>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                                <div className="w-12 h-12 rounded-lg bg-slate-100 flex-shrink-0"></div>
                                <div>
                                    <div className="h-3 w-32 bg-slate-200 rounded mb-2"></div>
                                    <div className="h-2 w-48 bg-slate-100 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        {
            title: "Enterprise Offline Resilience",
            subtitle: "Zero-dropout architecture for the field.",
            bullets: [
                { icon: WifiOff, text: "Browse cached jobs without Wi-Fi" },
                { icon: Database, text: "Perfect for on-site workers" },
                { icon: Shield, text: "Zero data loss guarantee" }
            ],
            visual: (
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl shadow-2xl relative overflow-hidden flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-slate-600">
                            <WifiOff size={32} className="text-slate-400" />
                        </div>
                        <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 border border-emerald-500/30">
                            <CheckCircle2 size={12} />
                            OFFLINE MODE ACTIVE
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "1-Click \"Easy Apply\" Ecosystem",
            subtitle: "Apply to 10 jobs in 10 seconds.",
            bullets: [
                { icon: Zap, text: "Universal profile formatting" },
                { icon: Smartphone, text: "One-tap submissions" },
                { icon: CheckCircle2, text: "Instant confirmations" }
            ],
            visualType: 'mobile'
        },
        {
            title: "AI Resume Grader",
            subtitle: "Optimize your profile to beat the ATS.",
            bullets: [
                { icon: Sparkles, text: "Automated keyword analysis" },
                { icon: FileText, text: "Layout suggestions" },
                { icon: BarChart3, text: "Impact score" }
            ],
            visualType: 'stats'
        },
        {
            title: "Salary Transparency Engine",
            subtitle: "Never get underpaid again.",
            bullets: [
                { icon: DollarSign, text: "Real-time industry averages" },
                { icon: Activity, text: "Skill-based salary bumps" },
                { icon: MessageSquare, text: "Negotiation insights" }
            ],
            visualType: 'stats'
        },
        {
            title: "Verified Company Reviews",
            subtitle: "Insider knowledge before you interview.",
            bullets: [
                { icon: Users, text: "Anonymous employee reviews" },
                { icon: Activity, text: "Culture ratings" },
                { icon: MessageSquare, text: "Interview question bank" }
            ],
            visualType: 'chat'
        },
        {
            title: "Skill Gap Analyzer",
            subtitle: "Your personalized career roadmap.",
            bullets: [
                { icon: Search, text: "Identifies missing skills" },
                { icon: Briefcase, text: "Target role comparisons" },
                { icon: Layers, text: "Suggests certifications" }
            ],
            visualType: 'dashboard'
        },
        {
            title: "Direct Hiring Manager Messaging",
            subtitle: "Cut out the middleman.",
            bullets: [
                { icon: MessageSquare, text: "Secure in-app chat" },
                { icon: CheckCircle2, text: "Read receipts" },
                { icon: EyeOff, text: "Privacy-first contact masking" }
            ],
            visualType: 'chat'
        },
        {
            title: "Smart Job Alerts",
            subtitle: "The best jobs find you.",
            bullets: [
                { icon: Bell, text: "Push notifications" },
                { icon: Sparkles, text: "Exact match alerts" },
                { icon: Globe, text: "Geographic radius settings" }
            ],
            visualType: 'mobile'
        },
        {
            title: "Stealth Mode (Privacy First)",
            subtitle: "Look for jobs without your boss knowing.",
            bullets: [
                { icon: EyeOff, text: "Hide profile from current employer" },
                { icon: Shield, text: "Anonymous browsing" },
                { icon: Lock, text: "Control visible data" }
            ],
            visualType: 'shield'
        }
    ];

    const adminFeatures: Feature[] = [
        {
            title: "Zero-Touch Automation Hub",
            subtitle: "A platform that feeds itself while you sleep.",
            bullets: [
                { icon: Globe, text: "Integrated Apify & Serper scrapers" },
                { icon: Activity, text: "Dynamic API logging" },
                { icon: Shield, text: "Smart duplicate rejection" }
            ],
            visual: (
                <div className="bg-[#0f172a] p-6 rounded-2xl shadow-2xl border border-slate-800 font-mono text-xs">
                    <div className="flex gap-2 mb-4 border-b border-slate-800 pb-2">
                        <Terminal size={14} className="text-slate-500" />
                        <span className="text-slate-400">root@proconnect:~</span>
                    </div>
                    <div className="space-y-2">
                        <div className="text-emerald-400">$ init automation_sequence --force</div>
                        <div className="text-slate-300">
                            <span className="text-blue-400">[INFO]</span> Connecting to Apify... <span className="text-emerald-500">OK</span>
                        </div>
                        <div className="text-slate-300">
                            <span className="text-blue-400">[INFO]</span> Fetching Serper News... <span className="text-emerald-500">OK</span>
                        </div>
                        <div className="text-slate-300">
                            <span className="text-yellow-400">[WARN]</span> 3 Duplicates Rejected
                        </div>
                        <div className="text-slate-300">
                            <span className="text-emerald-400">[SUCCESS]</span> 42 New Jobs Ingested
                        </div>
                        <div className="animate-pulse text-slate-500">_</div>
                    </div>
                </div>
            )
        },
        {
            title: "\"God Mode\" Control Center",
            subtitle: "Total data sovereignty at your fingertips.",
            bullets: [
                { icon: LayoutDashboard, text: "Live Master Data Tables" },
                { icon: Lock, text: "Instant Soft-Hide/Hard-Delete" },
                { icon: Sparkles, text: "Master AI Content Editor" }
            ],
            visual: (
                <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-200">
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                        <div className="flex gap-2 mb-3">
                            <div className="h-2 w-20 bg-slate-200 rounded"></div>
                            <div className="h-2 w-16 bg-slate-200 rounded"></div>
                        </div>
                        <div className="space-y-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center justify-between p-2 bg-white rounded border border-slate-100 shadow-sm">
                                    <div className="h-2 w-24 bg-slate-100 rounded"></div>
                                    <div className="flex gap-1">
                                        <div className="w-4 h-4 rounded bg-red-100 text-red-500 flex items-center justify-center">
                                            <Lock size={10} />
                                        </div>
                                        <div className="w-4 h-4 rounded bg-blue-100 text-blue-500 flex items-center justify-center">
                                            <LayoutDashboard size={10} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Global Activity Audit Trail",
            subtitle: "See every heartbeat of the platform.",
            bullets: [
                { icon: Activity, text: "Real-time event logging" },
                { icon: Layers, text: "Color-coded action types" },
                { icon: Search, text: "One-click entity tracing" }
            ],
            visualType: 'dashboard'
        },
        {
            title: "Scalable Firebase Architecture",
            subtitle: "Built to handle millions.",
            bullets: [
                { icon: Database, text: "NoSQL flexibility" },
                { icon: Zap, text: "Real-time socket listeners" },
                { icon: Activity, text: "Infinite horizontal scaling" }
            ],
            visualType: 'network'
        },
        {
            title: "Smart Data Quarantine",
            subtitle: "Keep your database pristine.",
            bullets: [
                { icon: Shield, text: "Automated duplicate rejection" },
                { icon: Search, text: "Fuzzy name matching" },
                { icon: EyeOff, text: "Shadow-banning logic" }
            ],
            visualType: 'shield'
        },
        {
            title: "AI Cost Management",
            subtitle: "Maximum intelligence, minimum API overhead.",
            bullets: [
                { icon: DollarSign, text: "Graceful rate-limit fallbacks" },
                { icon: Database, text: "Aggressive text caching" },
                { icon: Cpu, text: "Token optimization" }
            ],
            visualType: 'stats'
        },
        {
            title: "Granular RBAC Security",
            subtitle: "Enterprise-level access control.",
            bullets: [
                { icon: Lock, text: "Super Admin isolation" },
                { icon: User, text: "Recruiter & Seeker namespaces" },
                { icon: Shield, text: "Strict route protection" }
            ],
            visualType: 'shield'
        },
        {
            title: "Real-Time Revenue Analytics",
            subtitle: "Plug-and-play monetization.",
            bullets: [
                { icon: DollarSign, text: "Stripe billing ready" },
                { icon: LayoutDashboard, text: "Premium job tracking" },
                { icon: BarChart3, text: "Conversion metrics" }
            ],
            visualType: 'dashboard'
        },
        {
            title: "Automated SEO Generation",
            subtitle: "Organic growth on autopilot.",
            bullets: [
                { icon: Globe, text: "Dynamic meta-tags" },
                { icon: Search, text: "Index-ready URL structures" },
                { icon: Zap, text: "Sitemap automation" }
            ],
            visualType: 'doc'
        },
        {
            title: "Edge Distribution (CDN)",
            subtitle: "Lightning fast, globally.",
            bullets: [
                { icon: Zap, text: "Edge-cached images" },
                { icon: Activity, text: "Sub-100ms load times" },
                { icon: Globe, text: "Optimized bundle sizes" }
            ],
            visualType: 'network'
        }
    ];

    const content = {
        companies: {
            hero: {
                title: "Hire Smarter. Grow Faster.",
                subtitle: "Outpace the competition with AI-driven recruitment and instant distribution.",
                gradient: "from-blue-600 via-indigo-600 to-violet-600"
            },
            features: companiesFeatures
        },
        seekers: {
            hero: {
                title: "Land Your Dream Real Estate Career.",
                subtitle: "Your daily intelligence hub and premium career accelerator.",
                gradient: "from-emerald-600 via-teal-600 to-cyan-600"
            },
            features: seekersFeatures
        },
        admin: {
            hero: {
                title: "Enterprise-Grade Automation & Scale.",
                subtitle: "Zero-touch data ingestion and total platform sovereignty.",
                gradient: "from-slate-800 via-slate-700 to-slate-600"
            },
            features: adminFeatures
        }
    };

    const currentTab = content[activeTab];

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] font-sans text-slate-900 dark:text-white">

            {/* STICKY NAV */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

                    {/* Brand */}
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${currentTab.hero.gradient} shadow-lg transition-transform group-hover:scale-105`}>
                            <span className="text-white font-bold text-xl">P</span>
                        </div>
                        <span className={`text-xl font-black tracking-tight ${scrolled ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white md:text-white'}`}>
                            ProConnect<span className="text-opacity-80">.tour</span>
                        </span>
                    </div>

                    {/* Tab Switcher Pills */}
                    <div className="bg-slate-100/80 dark:bg-white/10 backdrop-blur-md p-1.5 rounded-full flex gap-1 shadow-inner border border-slate-200/50 dark:border-white/10">
                        {(['companies', 'seekers', 'admin'] as TabType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === tab
                                    ? 'bg-white dark:bg-[#222] text-slate-900 dark:text-white shadow-md transform scale-105'
                                    : 'text-slate-500 dark:text-slate-300 hover:text-slate-700 dark:hover:text-white'
                                    }`}
                            >
                                {tab === 'companies' && 'Companies'}
                                {tab === 'seekers' && 'Job Seekers'}
                                {tab === 'admin' && 'Admin & Investors'}
                            </button>
                        ))}
                    </div>

                    {/* CTA */}
                    <Link to="/en/jobs" className={`hidden md:flex items-center gap-2 font-bold transition-colors ${scrolled ? 'text-blue-600' : 'text-white'} hover:opacity-80`}>
                        Launch App <ArrowRight size={16} />
                    </Link>
                </div>
            </nav>

            {/* HERO SECTION */}
            <header className={`relative pt-48 pb-32 px-6 overflow-hidden bg-gradient-to-br ${currentTab.hero.gradient} text-white transition-all duration-700`}>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                <div className="max-w-6xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 content-visibility-auto">
                    <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-8 shadow-lg">
                        PLATFORM TOUR 2026
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight drop-shadow-sm">
                        {currentTab.hero.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-sm">
                        {currentTab.hero.subtitle}
                    </p>
                </div>

                {/* Curved Divider */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-white dark:bg-[#0a0a0a] rounded-t-[50%] scale-x-150 translate-y-8"></div>
            </header>

            {/* FEATURE SECTIONS (ZIG-ZAG) */}
            <main className="w-full">
                {currentTab.features.map((feature, index) => (
                    <FeatureBlock
                        key={index}
                        feature={feature}
                        index={index}
                        activeTab={activeTab}
                    />
                ))}
            </main>

            {/* FOOTER CTA */}
            <footer className="bg-slate-900 text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black mb-8">Ready to transform your workflow?</h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/en/jobs" className="px-10 py-4 bg-white text-slate-900 font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-lg">
                            Get Started Now
                        </Link>
                        <Link to="/en/recruiter" className="px-10 py-4 bg-slate-800 text-white font-bold rounded-xl border border-slate-700 hover:bg-slate-700 transition-all text-lg">
                            Post a Job
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};
