import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { logSystemActivity } from './apiLogger';

// 1. Delete Entity (Hard Delete)
// 1. Delete Entity (Soft Delete / Blacklist)
export const deleteEntity = async (collectionName: string, id: string): Promise<boolean> => {
    try {
        if (!id) throw new Error("Missing ID for deletion");
        // Soft delete: Hide and mark as Blacklisted
        await updateDoc(doc(db, collectionName, id), {
            isHidden: true,
            status: 'Blacklisted',
            deletedAt: new Date().toISOString()
        });
        await logSystemActivity('Admin Action', `Blacklisted (Soft Deleted) ${collectionName} item: ${id}`, 'Success');
        return true;
    } catch (error: any) {
        console.error(`Error deleting ${collectionName}:`, error);
        await logSystemActivity('Admin Error', `Failed to blacklist ${collectionName} item: ${id}`, 'Failed');
        return false;
    }
};

// 2. Toggle Visibility (Soft Delete)
export const toggleEntityVisibility = async (collectionName: string, id: string, isHidden: boolean): Promise<boolean> => {
    try {
        if (!id) throw new Error("Missing ID for update");
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, { isHidden: isHidden });

        const action = isHidden ? 'Hidden' : 'Unhidden';
        await logSystemActivity('Admin Action', `${action} ${collectionName} item: ${id}`, 'Success');
        return true;
    } catch (error: any) {
        console.error(`Error updating visibility for ${collectionName}:`, error);
        return false;
    }
};

// 3. Update Entity (Generic Update)
export const updateEntity = async (collectionName: string, id: string, data: any): Promise<boolean> => {
    try {
        if (!id) throw new Error("Missing ID for update");
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, data);

        await logSystemActivity('Admin Action', `Updated ${collectionName} item: ${id}`, 'Success');
        return true;
    } catch (error: any) {
        console.error(`Error updating ${collectionName}:`, error);
        return false;
    }
};
