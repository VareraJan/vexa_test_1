import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const firebaseConfigVEXA = {
  apiKey: process.env.REACT_APP_API_KEY_VEXA,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN_VEXA,
  projectId: process.env.REACT_APP_PROJECT_ID_VEXA,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET_VEXA,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_VEXA,
  appId: process.env.REACT_APP_APP_ID_VEXA,
};

const app = initializeApp(firebaseConfigVEXA);
// const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
