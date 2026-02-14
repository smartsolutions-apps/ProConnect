
import { Application, ApplicationStatus } from '../types';
import { JOBS } from './jobs';
import { COMPANIES } from './companies';

// Helper to get company details by ID
const getCompany = (id: string) => {
  const company = COMPANIES.find(c => c.id === id);
  if (!company) {
    // Fallback for safety during development
    return { name: "Unknown", logoUrl: "https://logo.clearbit.com/google.com" };
  }
  return company;
};

export const MY_APPLICATIONS: Application[] = [
  {
    id: "a1",
    jobId: "j1", // Matches Senior Frontend Engineer in data/jobs.ts
    jobTitle: "Senior Frontend Engineer",
    companyName: "Vodafone Egypt",
    companyLogo: getCompany("c1").logoUrl,
    status: ApplicationStatus.VIEWED,
    // Applied 10 days ago
    appliedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    // Last update 8 days ago (> 5 days, so Nudge active)
    lastUpdate: "Viewed 8 days ago",
    lastUpdateDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "a2",
    jobId: "j3", // Matches Product Manager in data/jobs.ts
    jobTitle: "Product Manager (FinTech)",
    companyName: "CIB Egypt",
    companyLogo: getCompany("c3").logoUrl,
    status: ApplicationStatus.INTERVIEW,
    // Applied 14 days ago
    appliedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdate: "Interview Scheduled for Sunday",
    // Active recently
    lastUpdateDate: new Date(Date.now()).toISOString()
  },
  {
    id: "a3",
    jobId: "j5", // External ID or manually added
    jobTitle: "Senior Backend Engineer",
    companyName: "Fawry",
    companyLogo: getCompany("c4").logoUrl,
    status: ApplicationStatus.APPLIED,
    // Applied 2 days ago
    appliedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdate: "Applied 2d ago",
    lastUpdateDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];
