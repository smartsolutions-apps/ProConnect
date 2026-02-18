
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Company, Job, Post, Project } from '../types';
import { REAL_PROJECTS } from '../data/realProjects';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

interface DataHydrationContextType {
  companies: Company[];
  jobs: Job[];
  newsFeed: Post[];
  projects: Project[];
  isHydrating: boolean;
}

export const DataHydrationContext = createContext<DataHydrationContextType | undefined>(undefined);

export const DataHydrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [projects, setProjects] = useState<Project[]>(REAL_PROJECTS);
  const [newsFeed, setNewsFeed] = useState<Post[]>([]);
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    // 1. Subscribe to Companies
    const unsubscribeCompanies = onSnapshot(collection(db, 'companies'), (snapshot) => {
      const liveCompanies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Company));
      setCompanies(liveCompanies);
    });

    // 2. Subscribe to Jobs
    const unsubscribeJobs = onSnapshot(collection(db, 'jobs'), (snapshot) => {
      const liveJobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job));
      setJobs(liveJobs);
    });

    // 3. Subscribe to News Feed
    const qNews = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribeNews = onSnapshot(qNews, (snapshot) => {
      const liveNews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
      setNewsFeed(liveNews);
      setIsHydrating(false);
    });

    return () => {
      unsubscribeCompanies();
      unsubscribeJobs();
      unsubscribeNews();
    };
  }, []);

  return (
    <DataHydrationContext.Provider value={{
      companies,
      jobs,
      newsFeed,
      projects,
      isHydrating
    }}>
      {children}
    </DataHydrationContext.Provider>
  );
};

export const useHydratedData = () => {
  const context = useContext(DataHydrationContext);
  if (!context) throw new Error('useHydratedData must be used within DataHydrationProvider');
  return context;
};
