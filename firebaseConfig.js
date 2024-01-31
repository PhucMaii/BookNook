import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyAZ5BEgh1fIT-dvITiQUB0Ve_Ea9IzgMJA',
    authDomain: 'booknook-1f077.firebaseapp.com',
    projectId: 'booknook-1f077',
    storageBucket: 'booknook-1f077.appspot.com',
    messagingSenderId: '982601127285',
    appId: '1:982601127285:web:a0f901f4db04d0d7e4af3c',
    measurementId: 'G-0HMJP5JYF0'
};

initializeApp(firebaseConfig);

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const db = getFirestore();
const storage = getStorage();
const functions = getFunctions();
export { auth, googleProvider, db, storage, functions };
