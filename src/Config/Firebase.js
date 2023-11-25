// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyAlK1RyY_uS5wSAA0Smh7xnYqve2DjMduk',
  authDomain: 'assets-management-9ce47.firebaseapp.com',
  projectId: 'assets-management-9ce47',
  storageBucket: 'assets-management-9ce47.appspot.com',
  messagingSenderId: '1000441207613',
  appId: '1:1000441207613:web:cee6d3aefef784c808c354',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
