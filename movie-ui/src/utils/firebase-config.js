
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCTLdHTi4_VtwWxDgOY1Z6jXpCBccMqHNs",
  authDomain: "react-netflix-clone-4b4f2.firebaseapp.com",
  projectId: "react-netflix-clone-4b4f2",
  storageBucket: "react-netflix-clone-4b4f2.appspot.com",
  messagingSenderId: "612904157334",
  appId: "1:612904157334:web:1f6803ddd2452fcb6902b7",
  measurementId: "G-WEF2KLTCM2"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)