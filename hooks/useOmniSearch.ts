import { useState, useMemo } from 'react';
import { useFirebaseData } from './useFirebaseData';
import { USERS, POSTS } from '../data'; // Keep USERS and POSTS local for now

export type OmniResultType = 'user' | 'company' | 'job' | 'post';

export interface OmniResult {
    id: string;
    type: OmniResultType;
    title: string;
    subtitle?: string;
    image?: string;
    status: string;
    data: any; // Raw data for editing
}

export const useOmniSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { firebaseCompanies, firebaseJobs, loading } = useFirebaseData();

    const results = useMemo(() => {
        const term = searchTerm.toLowerCase().trim();
        const allResults: OmniResult[] = [];

        // Filter Users (Local)
        USERS.forEach(user => {
            if (!term || user.name.toLowerCase().includes(term) || user.role?.toLowerCase().includes(term)) {
                allResults.push({
                    id: user.id,
                    type: 'user',
                    title: user.name,
                    subtitle: user.role || 'User',
                    image: user.avatarUrl,
                    status: 'Active', // Mock status
                    data: user
                });
            }
        });

        // Filter Companies (Live Firebase)
        firebaseCompanies.forEach(company => {
            if (!term || company.name?.toLowerCase().includes(term) || company.industry?.toLowerCase().includes(term)) {
                allResults.push({
                    id: company.id,
                    type: 'company',
                    title: company.name || 'Unknown Company',
                    subtitle: company.industry || 'Unknown Industry',
                    image: company.logoUrl,
                    status: company.isVerified ? 'Verified' : 'Unverified',
                    data: {
                        ...company,
                        source: company.source || 'Firebase DB' // Default source if missing
                    }
                });
            }
        });

        // Filter Jobs (Live Firebase)
        firebaseJobs.forEach(job => {
            if (!term || job.title?.toLowerCase().includes(term) || job.companyName?.toLowerCase().includes(term)) {
                allResults.push({
                    id: job.id,
                    type: 'job',
                    title: job.title || 'Untitled Job',
                    subtitle: job.companyName || 'Unknown Company',
                    image: undefined, // Could fetch company logo if we join data, but undefined is fine for now
                    status: 'Active',
                    data: {
                        ...job,
                        source: job.source || 'Firebase DB'
                    }
                });
            }
        });

        // Filter Posts (Local)
        if (Array.isArray(POSTS)) {
            POSTS.forEach(post => {
                const authorName = post.author?.name || '';
                const content = post.content || '';

                if (!term || content.toLowerCase().includes(term) || authorName.toLowerCase().includes(term)) {
                    allResults.push({
                        id: post.id,
                        type: 'post',
                        title: authorName || 'Unknown Author',
                        subtitle: content.substring(0, 50) + '...',
                        image: post.author?.avatarUrl,
                        status: 'Published',
                        data: post
                    });
                }
            });
        }

        return allResults;
    }, [searchTerm, firebaseCompanies, firebaseJobs]);

    return { searchTerm, setSearchTerm, results, loading };
};
