import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD3OU3vJI0mdUnWJmy8Qcc3yqGAyYVCs-k",
    authDomain: "santoshvite-33e37.firebaseapp.com",
    projectId: "santoshvite-33e37",
    storageBucket: "santoshvite-33e37.firebasestorage.app",
    messagingSenderId: "414332686507",
    appId: "1:414332686507:web:1772d7623f238a7a15a7ee",
    measurementId: "G-J4HJ3MZL1Y",
    dataBaseURL: "https://santoshvite-33e37-default-rtdb.firebaseio.com",
  };

   export const data = initializeApp(firebaseConfig);
   export const auth = getAuth(data);
  
