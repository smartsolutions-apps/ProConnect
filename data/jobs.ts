
import { Job, JobType } from '../types';
import { COMPANIES } from './companies';

const getCompany = (id: string) => COMPANIES.find(c => c.id === id)!;

export const JOBS: Job[] = [
  {
    id: 'j1',
    // Fix: Added slug property
    slug: "senior-frontend-engineer",
    title: 'Senior Frontend Engineer',
    companyId: 'c1',
    companyName: getCompany('c1').name,
    companyLogo: getCompany('c1').logoUrl,
    location: 'Smart Village, Giza',
    type: JobType.HYBRID,
    postedAt: '2h ago',
    description: 'Join our digital channels team to build the next generation MyVodafone App.',
    applicantsCount: 145,
    salaryRange: 'EGP 55k - 75k',
    isEasyApply: true
  },
  {
    id: 'j2',
    // Fix: Added slug property
    slug: "senior-civil-site-engineer",
    title: 'Senior Civil/Site Engineer',
    companyId: 'c2',
    companyName: getCompany('c2').name,
    companyLogo: getCompany('c2').logoUrl,
    location: 'New Administrative Capital',
    type: JobType.ON_SITE,
    postedAt: '5h ago',
    description: 'Leading site operations for major infrastructure projects in the NAC.',
    applicantsCount: 89,
    salaryRange: 'EGP 25k - 35k',
    isEasyApply: true,
    isDirectOffer: true
  },
  {
    id: 'j3',
    // Fix: Added slug property
    slug: "product-manager-fintech",
    title: 'Product Manager (FinTech)',
    companyId: 'c4',
    companyName: getCompany('c4').name,
    companyLogo: getCompany('c4').logoUrl,
    location: 'Cairo, Egypt',
    type: JobType.REMOTE,
    postedAt: '1d ago',
    description: 'Drive the product vision for our core merchant payment gateway.',
    applicantsCount: 312,
    salaryRange: 'EGP 40k - 60k',
    isEasyApply: false
  }
];
