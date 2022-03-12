import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi-b23s1dmrPSnlH3nt-jUiVd3CMZKXV0",
  authDomain: "medisale-app.firebaseapp.com",
  projectId: "medisale-app",
  storageBucket: "medisale-app.appspot.com",
  messagingSenderId: "896596955092",
  appId: "1:896596955092:web:836bd89489f45440a99041",
  measurementId: "G-BCEFP1TPXS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app, "gs://medisale-app.appspot.com");
const auth = getAuth();
const db = getFirestore();

export { auth, db, app, storage };
