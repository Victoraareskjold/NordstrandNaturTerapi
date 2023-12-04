import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAFa229UDLB1NYpuayKctfFCThyE-7IB3U",
  authDomain: "nordstrandnaturterapi.firebaseapp.com",
  projectId: "nordstrandnaturterapi",
  storageBucket: "nordstrandnaturterapi.appspot.com",
  messagingSenderId: "1018025367926",
  appId: "1:1018025367926:web:ac6bfccf7ae885787ec257",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
