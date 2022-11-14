import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB2ORPHhysb2gQyCgeWaofluqulEZJzgjs",
  authDomain: "music-collaboration-app.firebaseapp.com",
  projectId: "music-collaboration-app",
  storageBucket: "music-collaboration-app.appspot.com",
  messagingSenderId: "764644764614",
  appId: "1:764644764614:web:20be2714826d7bb09920c7",
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();
