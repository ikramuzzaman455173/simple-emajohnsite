// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChzPbyAW0qKbstOzlv7hLzkuM-AxIHnbk",
  authDomain: "emajohn-with-firebase-au-67840.firebaseapp.com",
  projectId: "emajohn-with-firebase-au-67840",
  storageBucket: "emajohn-with-firebase-au-67840.appspot.com",
  messagingSenderId: "496715806302",
  appId: "1:496715806302:web:6e45bb134f215e2a40e6cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app