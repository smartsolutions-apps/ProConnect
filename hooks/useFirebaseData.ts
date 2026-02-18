import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase'; // Adjust path if needed

export const useFirebaseData = () => {
    const [firebaseCompanies, setFirebaseCompanies] = useState<any[]>([]);
    const [firebaseJobs, setFirebaseJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubCompanies = onSnapshot(collection(db, 'companies'), (snapshot) => {
            setFirebaseCompanies(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        const unsubJobs = onSnapshot(collection(db, 'jobs'), (snapshot) => {
            setFirebaseJobs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });

        return () => {
            unsubCompanies();
            unsubJobs();
        };
    }, []);

    return { firebaseCompanies, firebaseJobs, loading };
};
