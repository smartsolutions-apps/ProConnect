
import { Application, ApplicationStatus } from '../types';
import { JOBS } from './jobs';
import { COMPANIES } from './companies';

// Helper to get job details easily
const getJob = (id: string) => JOBS.find(j => j.id === id)!;
const getCompany = (id: string) => COMPANIES.find(c => c.id === id)!;

export const MY_APPLICATIONS: Application[] = [
  {
    id: "a1",
    jobId: "j1",
    jobTitle: "Senior Frontend Engineer",
    companyName: "Vodafone Egypt",
    companyLogo: getCompany("c_vodafone").logoUrl,
    status: ApplicationStatus.VIEWED,
    // Applied 10 days ago
    appliedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    // Last update 8 days ago (> 5 days, so Nudge active)
    lastUpdate: "Viewed 8 days ago",
    lastUpdateDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "a2",
    jobId: "j4",
    jobTitle: "Product Owner",
    companyName: "Instabug",
    companyLogo: getCompany("c_instabug").logoUrl,
    status: ApplicationStatus.INTERVIEW,
    // Applied 14 days ago
    appliedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdate: "Interview Scheduled for Sunday",
    // Active recently
    lastUpdateDate: new Date(Date.now()).toISOString()
  },
  {
    id: "a3",
    jobId: "j5",
    jobTitle: "Senior Backend Engineer",
    companyName: "Fawry",
    companyLogo: getCompany("c_fawry").logoUrl,
    status: ApplicationStatus.APPLIED,
    // Applied 2 days ago
    appliedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdate: "Applied 2d ago",
    lastUpdateDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];
