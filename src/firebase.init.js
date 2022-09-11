
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBWi2ybrkfE7fXH-hVLZVbbqYaPXfWyXmY",
  authDomain: "mymidnighjourney.firebaseapp.com",
  projectId: "mymidnighjourney",
  storageBucket: "mymidnighjourney.appspot.com",
  messagingSenderId: "67843648379",
  appId: "1:67843648379:web:19dc062bfe815fa9766bde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const auth = getAuth(app);

