// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKtX6EUtuNCntTl9rWxnLH6jIZUzNEnHg",
  authDomain: "omarim-sente-418218.firebaseapp.com",
  projectId: "omarim-sente-418218",
  storageBucket: "omarim-sente-418218.appspot.com",
  messagingSenderId: "676571593469",
  appId: "1:676571593469:web:c0ad29fe73218c1c659c94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
