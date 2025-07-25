// Implemented Web3 Avatar Forge - Firebase Initialization
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "web3-avatar-forge",
  appId: "1:686593885378:web:7662bdb6da180bad32275b",
  storageBucket: "web3-avatar-forge.firebasestorage.app",
  apiKey: "AIzaSyC6Mv_AbhMQrDxpvMkGnYL_91r8W2aj-xg",
  authDomain: "web3-avatar-forge.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "686593885378"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
