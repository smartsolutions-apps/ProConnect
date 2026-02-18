import { writeBatch, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { REAL_COMPANIES } from '../data/realCompanies';
import { REAL_JOBS } from '../data/realJobs';

export const seedDatabaseToFirebase = async () => {
    try {
        const batch = writeBatch(db);
        let operationCount = 0;
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
