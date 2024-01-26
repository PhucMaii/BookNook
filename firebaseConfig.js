// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth, EmailAuthProvider } from "firebase/auth";
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: import.meta.env.API_KEY,
    authDomain: import.meta.env.AUTH_DOMAIN,
    projectId: import.meta.env.PROJECT_ID,
    storageBucket: import.meta.env.STORAGE_BUCKET,
    messagingSenderId: import.meta.env.MESSAGE_ID,
    appId: import.meta.env.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const emailprovider = new EmailAuthProvider();
// const db = getFirestore(app);
// const storage = getStorage ();

export { app };
