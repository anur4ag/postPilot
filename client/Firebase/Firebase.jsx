// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBB2TNA_3tNjUkcPa_lgwqe2Slhazn1hM",
  authDomain: "postpilot-5775f.firebaseapp.com",
  databaseURL: "https://postpilot-5775f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "postpilot-5775f",
  storageBucket: "postpilot-5775f.appspot.com",
  messagingSenderId: "1062745242856",
  appId: "1:1062745242856:web:4967b9f0934db8eaeadd5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth, app };