import { db } from '../../lib/firebase';
import { collection, setDoc, doc, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore';

export type ActionType = 'User Joined' | 'Company Added' | 'News Generated' | 'System Error' | 'Data Ingestion' | 'Post Generated';

export interface ActivityLog {
    id: string;
    actionType: ActionType;
    description: string;
    status: 'Success' | 'Failed';
    timestamp: any; // Firestore Timestamp
    meta?: any; // Optional metadata
}

// Log a system activity
export const logSystemActivity = async (
    actionType: ActionType,
    description: string,
    status: 'Success' | 'Failed',
    meta?: { entityUrl?: string; entityId?: string; entityType?: string;[key: string]: any }
) => {
    try {
        const logId = `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Sanitize meta to remove undefined values which Firebase rejects
        const sanitizedMeta = meta ? JSON.parse(JSON.stringify(meta)) : null;

        const logEntry: ActivityLog = {
            id: logId,
            actionType,
            description: description || 'No details provided',
            status,
            timestamp: serverTimestamp(),
            meta: sanitizedMeta
        };

        await setDoc(doc(db, 'activity_logs', logId), logEntry);
        console.log(`[Activity Log] ${actionType}: ${status} - ${description}`);

    } catch (error) {
        console.error("Failed to write to Activity Log:", error);
    }
};

// Legacy support wrapper (renaming slowly)
export const logApiActivity = async (serviceName: string, status: 'Success' | 'Failed', summary: string) => {
    // Map legacy API logs to new structure
    const actionType = status === 'Failed' ? 'System Error' : 'Data Ingestion';
    await logSystemActivity(actionType, `${serviceName}: ${summary}`, status);
};

// Fetch latest activities for the feed
export const fetchRecentActivities = async (limitCount: number = 50) => {
    try {
        const q = query(
            collection(db, 'activity_logs'),
            orderBy('timestamp', 'desc'),
            limit(limitCount)
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            // Convert Timestamp to Date if needed, or keep as is
            return { id: doc.id, ...data } as ActivityLog;
        });
    } catch (error) {
        console.error("Error fetching activities:", error);
        return [];
    }
};
