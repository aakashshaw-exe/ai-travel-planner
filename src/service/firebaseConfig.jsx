// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtKXZSdg1SquE1L_QCWb2nJz9eLCcY348",
  authDomain: "ai-travel-planner-229c2.firebaseapp.com",
  projectId: "ai-travel-planner-229c2",
  storageBucket: "ai-travel-planner-229c2.appspot.com",
  messagingSenderId: "166331285293",
  appId: "1:166331285293:web:051495990bedc3d06f9da4",
  measurementId: "G-H25DE4JYT8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
// const analytics = getAnalytics(app);