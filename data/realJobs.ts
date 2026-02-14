
import { Job, JobType } from '../types';

const BRANDFETCH_CLIENT_ID = "1idiSqP5yegNdsQZndZ";

export const REAL_JOBS: Job[] = [
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
  }
];
