import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2R9TH1ah67iOVHFJVDcwFY6cagzFUS40",
  authDomain: "e-ecommerce1.firebaseapp.com",
  projectId: "e-ecommerce1",
  storageBucket: "e-ecommerce1.appspot.com",
  messagingSenderId: "291937159368",
  appId: "1:291937159368:web:0b03c1d5ca8719d7213dfd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
