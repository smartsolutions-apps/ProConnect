import { writeBatch, doc, collection, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { REAL_COMPANIES } from '../data/realCompanies';
import { REAL_JOBS } from '../data/realJobs';

const DUMMY_POSTS = [
    {
        title: "Egypt's Real Estate Market Sees 15% Growth in Q1",
        category: "Market News"
    },
    {
        title: "Top 5 Upcoming Commercial Hubs in New Cairo",
        category: "Construction"
    },
    {
        title: "Invest-Gate 2026 Awards Announced",
        category: "Events"
    },
    {
        title: "Sustainable Architecture takes over the North Coast",
        category: "Construction"
    },
    {
        title: "Global PropTech Innovations reaching MENA",
        category: "Market News"
    }
];

const seedPosts = async () => {
    console.log(`Seeding ${DUMMY_POSTS.length} posts...`);
    let count = 0;
    for (const post of DUMMY_POSTS) {
        const postId = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now();
        const postData = {
            ...post,
            author: "ProConnect Bot",
            authorRole: "AI News Engine",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
            createdAt: new Date().toISOString(),
            likes: Math.floor(Math.random() * 50),
            comments: Math.floor(Math.random() * 10)
        };

        await setDoc(doc(db, 'posts', postId), postData);
        count++;
    }
    return count;
};

export const seedDatabaseToFirebase = async () => {
    try {
        const batch = writeBatch(db);
        let operationCount = 0;

        // Seed Posts
        const postsSeeded = await seedPosts();
        operationCount += postsSeeded;

        // Seed Companies
        console.log(`Seeding ${REAL_COMPANIES.length} companies...`);
        REAL_COMPANIES.forEach(company => {
            // Use slug as ID if available, otherwise company.id
            const docId = company.slug || company.id;
            const ref = doc(db, 'companies', docId);
            batch.set(ref, company);
            operationCount++;
        });

        // Seed Jobs
        console.log(`Seeding ${REAL_JOBS.length} jobs...`);
        REAL_JOBS.forEach(job => {
            // Use slug as ID if available, otherwise job.id
            const docId = job.slug || job.id;
            const ref = doc(db, 'jobs', docId);
            batch.set(ref, job);
            operationCount++;
        });

        await batch.commit();
        console.log(`Successfully committed ${operationCount} operations to Firebase.`);
        return { success: true, count: operationCount };
    } catch (error) {
        console.error("Error seeding database:", error);
        return { success: false, error };
    }
};
