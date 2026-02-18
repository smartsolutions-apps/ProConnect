
import { Job, JobType } from '../types';

const BRANDFETCH_CLIENT_ID = "1idiSqP5yegNdsQZndZ";

export const REAL_JOBS: Job[] = [
  {
    id: 'rj_sodic_1',
    slug: 'community-manager-sodic-2026',
    title: 'Community Manager',
    companyId: 'c33',
    companyName: 'SODIC',
    companyLogo: `https://cdn.brandfetch.io/domain/sodic.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'New Cairo, Cairo, Egypt',
    type: JobType.FULL_TIME,
    postedAt: '2 days ago',
    applicantsCount: 45,
    isEasyApply: true,
    description: `Manage all community related issues... Minimum 7-10 years experience in reputable Real Estate Developer... Bachelor's degree in Business Admin.`
  },
  // --- PREVIOUS JOBS (TECH/GIG) ---
  {
    id: 'rj1',
    // Fix: Added slug property
    slug: "senior-react-architect",
    title: 'Senior React Architect', companyId: 'c1', companyName: 'Vodafone Egypt',
    companyLogo: `https://cdn.brandfetch.io/domain/vodafone.com.eg?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'Smart Village, Giza', type: JobType.HYBRID, postedAt: '1h ago', applicantsCount: 156, salaryRange: 'EGP 65k - 90k', isEasyApply: true,
    description: 'Lead technical strategy for core consumer platforms.'
  },
  {
    id: 'rj2',
    // Fix: Added slug property
    slug: "sales-force-coordinator",
    title: 'Sales Force Coordinator', companyId: 'c3', companyName: 'Emaar Misr',
    companyLogo: `https://cdn.brandfetch.io/domain/emaarmisr.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'New Cairo, Cairo', type: JobType.FULL_TIME, postedAt: '3h ago', applicantsCount: 89, salaryRange: 'EGP 15k + Comm.', isEasyApply: true,
    description: 'Drive luxury real estate sales in East Cairo.'
  },
  {
    id: 'rj3',
    // Fix: Added slug property
    slug: "growth-product-manager",
    title: 'Growth Product Manager', companyId: 'c5', companyName: 'Fawry',
    companyLogo: `https://cdn.brandfetch.io/domain/fawry.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'Smart Village, Giza', type: JobType.FULL_TIME, postedAt: '5h ago', applicantsCount: 42, salaryRange: 'EGP 45k - 65k', isEasyApply: false,
    description: 'Scale Fawry Pay user acquisition and retention.'
  },
  {
    id: 'rj4',
    // Fix: Added slug property
    slug: "backend-engineer-go",
    title: 'Backend Engineer (Go)', companyId: 'c4', companyName: 'Swvl',
    companyLogo: `https://cdn.brandfetch.io/domain/swvl.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'Maadi, Cairo', type: JobType.REMOTE, postedAt: '1d ago', applicantsCount: 212, salaryRange: 'EGP 50k - 75k', isEasyApply: true,
    description: 'Optimize mass transit routing engines.'
  },
  {
    id: 'rj11',
    // Fix: Added slug property
    slug: "bilingual-event-usher",
    title: 'Bilingual Event Usher', companyId: 'c22', companyName: 'Dell Technologies',
    companyLogo: `https://cdn.brandfetch.io/domain/dell.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'Cairo ICT', type: JobType.TEMPORARY, postedAt: 'Just Now', applicantsCount: 15, salaryRange: 'EGP 800 / Day', isEasyApply: true,
    description: 'Represent Dell at our flagship Cairo ICT booth.'
  },

  // --- NEW REAL ESTATE JOBS (APPENDED) ---
  {
    id: 'rej1',
    // Fix: Added slug property
    slug: "senior-property-consultant-off-plan",
    title: 'Senior Property Consultant (Off-Plan)', companyId: 're10', companyName: 'Coldwell Banker Egypt',
    companyLogo: `https://cdn.brandfetch.io/domain/coldwellbanker-eg.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'New Cairo, Fifth Settlement', type: JobType.FULL_TIME, postedAt: '10m ago', applicantsCount: 45, salaryRange: 'EGP 15k + High Comm.', isEasyApply: true,
    description: 'Focus on primary sales for top developers like TMG and Palm Hills. Proven track record in luxury sales required.'
  },
  {
    id: 'rej2',
    // Fix: Added slug property
    slug: "resale-team-leader",
    title: 'Resale Team Leader', companyId: 're9', companyName: 'Nawy',
    companyLogo: `https://cdn.brandfetch.io/domain/nawy.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'Sheikh Zayed City', type: JobType.FULL_TIME, postedAt: '1h ago', applicantsCount: 28, salaryRange: 'EGP 25k + Comm.', isEasyApply: true,
    description: 'Lead a team of 10 consultants focused on high-inventory resale units in West Cairo. [Brokerage]'
  },
  {
    id: 'rej3',
    // Fix: Added slug property
    slug: "commercial-real-estate-advisor",
    title: 'Commercial Real Estate Advisor', companyId: 're11', companyName: 'RE/MAX Egypt',
    companyLogo: `https://cdn.brandfetch.io/domain/remax.com.eg?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'New Administrative Capital', type: JobType.HYBRID, postedAt: '2h ago', applicantsCount: 19, salaryRange: 'EGP 20k + Comm.', isEasyApply: false,
    description: 'Specializing in office space and retail mall leasing in the NAC central business district.'
  },
  {
    id: 'rej4',
    // Fix: Added slug property
    slug: "crm-retention-manager",
    title: 'CRM & Retention Manager', companyId: 're2', companyName: 'SODIC',
    companyLogo: `https://cdn.brandfetch.io/domain/sodic.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'Sheikh Zayed, Giza', type: JobType.FULL_TIME, postedAt: '3h ago', applicantsCount: 12, salaryRange: 'EGP 45k - 60k', isEasyApply: false,
    description: 'Optimize the post-sales journey for SODIC homeowners. Experience with Salesforce is a must.'
  },
  {
    id: 'rej5',
    // Fix: Added slug property
    slug: "marketing-director-new-capital-projects",
    title: 'Marketing Director (New Capital Projects)', companyId: 're5', companyName: 'Mountain View',
    companyLogo: `https://cdn.brandfetch.io/domain/mountainviewegypt.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'New Cairo, Cairo', type: JobType.FULL_TIME, postedAt: '5h ago', applicantsCount: 7, salaryRange: 'EGP 80k - 110k', isEasyApply: false,
    description: 'Lead the brand strategy and launch campaigns for our latest expansion in the New Capital.'
  },
  {
    id: 'rej6',
    // Fix: Added slug property
    slug: "client-advisor-north-coast-luxury",
    title: 'Client Advisor - North Coast Luxury', companyId: 're4', companyName: 'Ora Developers',
    companyLogo: `https://cdn.brandfetch.io/domain/oradevelopers.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'North Coast (Summer Only)', type: JobType.TEMPORARY, postedAt: '1d ago', applicantsCount: 112, salaryRange: 'EGP 2,000 / Day', isEasyApply: true,
    description: 'Represent Ora at Silversands during the summer season. Excellent communication and networking skills required.'
  },
  {
    id: 'rej7',
    // Fix: Added slug property
    slug: "site-architecture-lead",
    title: 'Site Architecture Lead', companyId: 're3', companyName: 'TMG Holding',
    companyLogo: `https://cdn.brandfetch.io/domain/talaatmoustafa.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'Madinaty, Cairo', type: JobType.ON_SITE, postedAt: '1d ago', applicantsCount: 34, salaryRange: 'EGP 40k - 55k', isEasyApply: false,
    description: 'Oversee structural finishes for the newest phase of Noor City.'
  },
  {
    id: 'rej8',
    // Fix: Added slug property
    slug: "data-analyst-market-pricing",
    title: 'Data Analyst (Market Pricing)', companyId: 're12', companyName: 'Property Finder Egypt',
    companyLogo: `https://cdn.brandfetch.io/domain/propertyfinder.eg?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'Remote (Egypt)', type: JobType.REMOTE, postedAt: '2d ago', applicantsCount: 89, salaryRange: 'EGP 30k - 45k', isEasyApply: true,
    description: 'Generate weekly pricing indices for major Cairo districts to power our market reports.'
  },
  {
    id: 'rej9',
    // Fix: Added slug property
    slug: "telesales-expert-inbound",
    title: 'Telesales Expert (Inbound)', companyId: 're13', companyName: 'Aqarmap',
    companyLogo: `https://cdn.brandfetch.io/domain/aqarmap.com.eg?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'Maadi, Cairo', type: JobType.FULL_TIME, postedAt: '4h ago', applicantsCount: 145, salaryRange: 'EGP 12k + Bonus', isEasyApply: true,
    description: 'Filter and qualify leads for our developer partners. Fast-paced, target-driven environment.'
  },
  {
    id: 'rej10',
    // Fix: Added slug property
    slug: "community-manager",
    title: 'Community Manager', companyId: 're6', companyName: 'Orascom Development',
    companyLogo: `https://cdn.brandfetch.io/domain/orascomdh.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'El Gouna, Red Sea', type: JobType.FULL_TIME, postedAt: '1w ago', applicantsCount: 22, salaryRange: 'EGP 25k + Housing', isEasyApply: false,
    description: 'Ensure a premium living experience for El Gouna residents through proactive facilities and event management.'
  },

  // --- LIVE DATA INJECTION FEB 2026 ---
  {
    id: 'live_job_1',
    slug: 'sales-executive-commercial-real-estate',
    title: 'Sales Executive - Commercial Real Estate',
    companyId: 'live_infinity',
    companyName: 'Infinity Towers for Urban Development',
    companyLogo: `https://cdn.brandfetch.io/domain/infinityt.net?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'New Heliopolis, Cairo',
    type: JobType.HYBRID,
    postedAt: '2h ago',
    applicantsCount: 45,
    salaryRange: 'EGP 15k - 25k',
    isEasyApply: true,
    description: 'Join the team behind one of the tallest towers in the new capital. Focus on commercial sales.'
  },
  {
    id: 'live_job_2',
    slug: 'property-consultant-cornerstone',
    title: 'Property Consultant',
    companyId: 'live_cornerstone',
    companyName: 'Cornerstone Development',
    companyLogo: `https://cdn.brandfetch.io/domain/cornerstonedv.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'Cairo, Cairo',
    type: JobType.ON_SITE,
    postedAt: '4h ago',
    applicantsCount: 23,
    salaryRange: 'EGP 12k + Comm',
    isEasyApply: true,
    description: 'Sell premium boutique developments in the New Capital.'
  },
  {
    id: 'live_job_3',
    slug: 'real-estate-sales-agent-address',
    title: 'Real Estate Sales Agent',
    companyId: 'live_address',
    companyName: 'The Address Investments',
    companyLogo: `https://cdn.brandfetch.io/domain/theaddress-eg.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'Cairo, Cairo',
    type: JobType.ON_SITE,
    postedAt: '1h ago',
    applicantsCount: 67,
    salaryRange: 'Commission Based',
    isEasyApply: true,
    description: 'Join one of the fastest growing brokerages in East Cairo.'
  },
  {
    id: 'live_job_4',
    slug: 'associate-commercial-maf',
    title: 'Associate - Commercial',
    companyId: 'live_maf',
    companyName: 'Majid Al Futtaim',
    companyLogo: `https://cdn.brandfetch.io/domain/majidalfuttaim.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'Cairo, Cairo',
    type: JobType.ON_SITE,
    postedAt: '5h ago',
    applicantsCount: 120,
    salaryRange: 'Competitive',
    isEasyApply: false,
    description: 'Manage commercial leasing for MAF properties in Egypt.'
  },
  {
    id: 'live_job_5',
    slug: 'commercial-real-estate-broker-era',
    title: 'Commercial Real Estate Broker',
    companyId: 'live_era',
    companyName: 'ERA Real Estate Egypt',
    companyLogo: `https://cdn.brandfetch.io/domain/eraegypt.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'Cairo, Cairo',
    type: JobType.ON_SITE,
    postedAt: '3h ago',
    applicantsCount: 30,
    salaryRange: 'EGP 10k + Comm',
    isEasyApply: true,
    description: 'Specialize in commercial resale and leasing.'
  },
  {
    id: 'live_job_6',
    slug: 'property-consultant-red',
    title: 'Property Consultant (Real Estate Sales)',
    companyId: 'live_red',
    companyName: 'RED - Real Estate Domain',
    companyLogo: `https://cdn.brandfetch.io/domain/redconegypt.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'Cairo, Cairo',
    type: JobType.ON_SITE,
    postedAt: '6h ago',
    applicantsCount: 55,
    salaryRange: 'EGP 15k + Comm',
    isEasyApply: true,
    description: 'Consult with high-net-worth individuals on portfolio management.'
  },
  {
    id: 'live_job_7',
    slug: 'real-estate-property-consultant-tld',
    title: 'Real Estate Property Consultant',
    companyId: 'live_tld',
    companyName: 'TLD - The Land Developers',
    companyLogo: `https://cdn.brandfetch.io/domain/thelanddevelopers.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'Cairo, Cairo',
    type: JobType.ON_SITE,
    postedAt: '12h ago',
    applicantsCount: 15,
    salaryRange: 'EGP 12k - 18k',
    isEasyApply: true,
    description: 'Direct sales for TLD projects in New Cairo.'
  },
  {
    id: 'live_job_8',
    slug: 'strategy-transactions-manager-deloitte',
    title: 'Strategy & Transactions - Manager (Real Estate Advisory)',
    companyId: 'live_deloitte',
    companyName: 'Deloitte',
    companyLogo: `https://cdn.brandfetch.io/domain/deloitte.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'New Cairo, Cairo',
    type: JobType.HYBRID,
    postedAt: '1d ago',
    applicantsCount: 88,
    salaryRange: 'Confidential',
    isEasyApply: false,
    description: 'Lead advisory projects for major real estate developments.'
  },
  {
    id: 'live_job_9',
    slug: 'real-estate-agent-coldwell',
    title: 'Real Estate Agent',
    companyId: 're10',
    companyName: 'Coldwell Banker Egypt',
    companyLogo: `https://cdn.brandfetch.io/domain/coldwellbanker-eg.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'New Cairo, Cairo',
    type: JobType.ON_SITE,
    postedAt: '2h ago',
    applicantsCount: 90,
    salaryRange: 'Commission Only',
    isEasyApply: true,
    description: 'Join the global leader in real estate brokerage.'
  },
  {
    id: 'live_job_10',
    slug: 'property-advisor-v-brokers',
    title: 'Property Advisor - Real Estate Opportunities',
    companyId: 'live_vbroker',
    companyName: 'V The Brokers',
    companyLogo: `https://cdn.brandfetch.io/domain/vthebrokers.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'Cairo, Cairo',
    type: JobType.ON_SITE,
    postedAt: '4h ago',
    applicantsCount: 20,
    salaryRange: 'EGP 8k + Comm',
    isEasyApply: true,
    description: 'Focus on primary market sales in West Cairo.'
  },
  {
    id: 'live_job_11',
    slug: 'marketing-sales-consultant-ssc',
    title: 'Marketing & Sales Consultant (Real Estate)',
    companyId: 'live_ssc',
    companyName: 'SSC HR Solutions',
    companyLogo: `https://cdn.brandfetch.io/domain/sschrsolutions.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'Cairo, Cairo',
    type: JobType.REMOTE,
    postedAt: '1d ago',
    applicantsCount: 110,
    salaryRange: 'EGP 10k - 15k',
    isEasyApply: true,
    description: 'Recruiting for various real estate clients.'
  },
  {
    id: 'live_job_12',
    slug: 'senior-property-consultant-tmg',
    title: 'Senior Property Consultant - Giza',
    companyId: 'dev_tmg',
    companyName: 'Talaat Moustafa Group',
    companyLogo: `https://cdn.brandfetch.io/domain/talaatmoustafa.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'Giza, Giza',
    type: JobType.ON_SITE,
    postedAt: '5h ago',
    applicantsCount: 65,
    salaryRange: 'EGP 20k + Comm',
    isEasyApply: true,
    description: 'Sales for Noor and Madinaty projects.'
  },

  // --- DIVERSE ROLES INJECTION (FEB 2026) ---
  {
    id: 'live_job_13',
    slug: 'site-civil-engineer-solik',
    title: 'Site Civil Engineer',
    companyId: 'live_solik',
    companyName: 'Solik Real Estate Investment',
    companyLogo: `https://cdn.brandfetch.io/domain/solik.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'Alexandria, Egypt',
    type: JobType.ON_SITE,
    postedAt: '2h ago',
    applicantsCount: 18,
    salaryRange: 'EGP 12k - 18k',
    isEasyApply: false,
    description: 'Oversee daily site operations and ensure compliance with project specifications.'
  },
  {
    id: 'live_job_14',
    slug: 'cfo-royal-development',
    title: 'Chief Financial Officer (CFO)',
    companyId: 'live_royal',
    companyName: 'Royal for Real Estate Development',
    companyLogo: `https://cdn.brandfetch.io/domain/royal-development.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'New Cairo, Cairo',
    type: JobType.ON_SITE,
    postedAt: '5h ago',
    applicantsCount: 4,
    salaryRange: 'Confidential',
    isEasyApply: false,
    description: 'Lead financial strategy and investment planning for upcoming mega-projects.'
  },
  {
    id: 'live_job_15',
    slug: '3d-visualizer-nawy',
    title: '3D Visualizer',
    companyId: 're9',
    companyName: 'Nawy',
    companyLogo: `https://cdn.brandfetch.io/domain/nawy.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'Maadi, Cairo',
    type: JobType.HYBRID,
    postedAt: '1d ago',
    applicantsCount: 56,
    salaryRange: 'EGP 15k - 25k',
    isEasyApply: true,
    description: 'Create photorealistic renders for marketing campaigns and virtual tours.'
  },
  {
    id: 'live_job_16',
    slug: 'paid-media-lead-egypt-best',
    title: 'Paid Media Lead (Google Ads)',
    companyId: 'live_ebp',
    companyName: 'Egypt Best Properties',
    companyLogo: `https://cdn.brandfetch.io/domain/egyptbestproperties.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'Cairo, Egypt',
    type: JobType.REMOTE,
    postedAt: '3h ago',
    applicantsCount: 12,
    salaryRange: 'EGP 25k - 35k',
    isEasyApply: true,
    description: 'Manage high-budget ad campaigns to generate qualified real estate leads.'
  },
  {
    id: 'live_job_17',
    slug: 'planning-engineer-dewan',
    title: 'Planning Engineer',
    companyId: 'live_dewan',
    companyName: 'Dewan Architects + Engineers',
    companyLogo: `https://cdn.brandfetch.io/domain/dewan-architects.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'Alexandria, Egypt',
    type: JobType.ON_SITE,
    postedAt: '6h ago',
    applicantsCount: 22,
    salaryRange: 'EGP 18k - 24k',
    isEasyApply: false,
    description: 'Develop project schedules and monitor progress for large-scale developments.'
  },
  {
    id: 'live_job_18',
    slug: 'legal-affairs-manager-capital-link',
    title: 'Legal Affairs Manager',
    companyId: 'live_caplink',
    companyName: 'Capital Link Developments',
    companyLogo: `https://cdn.brandfetch.io/domain/capitallink.com.eg?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'New Cairo, Cairo',
    type: JobType.ON_SITE,
    postedAt: '1d ago',
    applicantsCount: 8,
    salaryRange: 'EGP 35k - 50k',
    isEasyApply: false,
    description: 'Handle contract negotiations, compliance, and dispute resolution.'
  },
  {
    id: 'live_job_19',
    slug: 'civil-technical-office-manager-turath',
    title: 'Civil Technical Office Manager',
    companyId: 'live_turath',
    companyName: 'Turath Real Estate',
    companyLogo: `https://cdn.brandfetch.io/domain/turath.com?c=${BRANDFETCH_CLIENT_ID}`,
    location: 'Al Obour City, Qalyubia',
    type: JobType.ON_SITE,
    postedAt: '4h ago',
    applicantsCount: 15,
    salaryRange: 'EGP 25k - 35k',
    isEasyApply: true,
    description: 'Manage technical submittals, shop drawings, and quantity surveying.'
  }
];
