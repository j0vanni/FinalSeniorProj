// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIKXIdDafybPDL5hSP5PAI_PWKhEYs1r4",
  authDomain: "senior-proj-bc319.firebaseapp.com",
  projectId: "senior-proj-bc319",
  storageBucket: "senior-proj-bc319.appspot.com",
  messagingSenderId: "262718210680",
  appId: "1:262718210680:web:54179458f1c69e70b7238d",
  measurementId: "G-T52HYDG78Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const authentication = getAuth(app);
