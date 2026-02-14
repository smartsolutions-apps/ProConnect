
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Company, Job, Post, Project } from '../types';
import { REAL_COMPANIES } from '../data/realCompanies';
import { REAL_JOBS } from '../data/realJobs';
import { REAL_PROJECTS } from '../data/realProjects';
import { fetchIndustryNews } from '../services/api/newsService';

interface DataHydrationContextType {
  companies: Company[];
  jobs: Job[];
  newsFeed: Post[];
  projects: Project[];
  isHydrating: boolean;
}

const DataHydrationContext = createContext<DataHydrationContextType | undefined>(undefined);

export const DataHydrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [companies, setCompanies] = useState<Company[]>(REAL_COMPANIES);
  const [jobs, setJobs] = useState<Job[]>(REAL_JOBS);
  const [projects, setProjects] = useState<Project[]>(REAL_PROJECTS);
  const [newsFeed, setNewsFeed] = useState<Post[]>([]);
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    const hydrateData = async () => {
      // Fetch news from both sectors
      const techNews = await fetchIndustryNews('TECH');
      const reNews = await fetchIndustryNews('REAL_ESTATE');
      
      setNewsFeed([...techNews, ...reNews]);
      setIsHydrating(false);
    };

    hydrateData();
  }, []);

  return (
    <DataHydrationContext.Provider value={{ companies, jobs, newsFeed, projects, isHydrating }}>
      {children}
    </DataHydrationContext.Provider>
  );
};

export const useHydratedData = () => {
  const context = useContext(DataHydrationContext);
  if (!context) throw new Error('useHydratedData must be used within DataHydrationProvider');
  return context;
};
