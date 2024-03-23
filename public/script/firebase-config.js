// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD36LUSBedozAdZqjGk8qNAaILqnI6SLGc",
  authDomain: "apexcode-9d5e1.firebaseapp.com",
  projectId: "apexcode-9d5e1",
  storageBucket: "apexcode-9d5e1.appspot.com",
  messagingSenderId: "1014779145635",
  appId: "1:1014779145635:web:fbd980a52c52491099be16",
  measurementId: "G-6NWMC4MB57",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
