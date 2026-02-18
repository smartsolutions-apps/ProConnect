
import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCBKlYHA4nMtaJMS7O_0xba6gOyd-dlYH8",
    authDomain: "pro-connect-hub.firebaseapp.com",
    projectId: "pro-connect-hub",
    storageBucket: "pro-connect-hub.firebasestorage.app",
    messagingSenderId: "191582311355",
    appId: "1:191582311355:web:9c3403f3a2f0c874fe6a9e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Enable Offline Persistence
enableIndexedDbPersistence(db).catch((err) => {
    if (err.code == 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a a time.
        console.warn('Persistence failed: Multiple tabs open');
    } else if (err.code == 'unimplemented') {
        // The current browser does not support all of the features required to enable persistence
        console.warn('Persistence failed: Browser not supported');
    }
});
export const storage = getStorage(app);
export const auth = getAuth(app);
