import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,

  authDomain: 'inbudget-87ad5.firebaseapp.com',

  projectId: 'inbudget-87ad5',

  storageBucket: 'inbudget-87ad5.appspot.com',

  messagingSenderId: '118248538857',

  appId: '1:118248538857:web:334c477955de4482262678',

  measurementId: 'G-D4FJQTS5ZR',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
