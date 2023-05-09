// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2z7bQ2bWl-c9O9KEygO6Iga5Ly6Ct-0g",
  authDomain: "my-healthy-plate.firebaseapp.com",
  databaseURL: "https://my-healthy-plate-default-rtdb.firebaseio.com",
  projectId: "my-healthy-plate",
  storageBucket: "my-healthy-plate.appspot.com",
  messagingSenderId: "716456165333",
  appId: "1:716456165333:web:ec19c7bb9652138dafc75c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;