// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUBPnPA47sS2aTLQVcQjFRvIQKKWM4gbA",
  authDomain: "cat-social-f34ea.firebaseapp.com",
  projectId: "cat-social-f34ea",
  storageBucket: "cat-social-f34ea.appspot.com",
  messagingSenderId: "435894322138",
  appId: "1:435894322138:web:7d63869cea2b273fcd76e3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
