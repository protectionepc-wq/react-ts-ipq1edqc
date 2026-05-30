import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBYaPUBGUk_lV_JNu_YQYJCOigDXcPUyhM",
  authDomain: "chantier-epc.firebaseapp.com",
  projectId: "chantier-epc",
  storageBucket: "chantier-epc.firebasestorage.app",
  messagingSenderId: "468823783349",
  appId: "1:468823783349:web:f1a2389766c76ef70d4bfc"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
