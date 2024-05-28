import { getAuth } from "firebase/auth";
  // Import the functions you need from the SDKs you need
  import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: String(process.env.REACT_APP_APIKEY),
  authDomain:String(process.env.REACT_APP_AUTHDOMAIN),
  projectId: String(process.env.REACT_APP_PROJECTID),
  storageBucket: String(process.env.REACT_APP_STORAGEBUCKET),
  messagingSenderId: String(process.env.REACT_APP_MESSAGINGSENDERID),
  appId: String(process.env.REACT_APP_APPID)
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export {db,auth,storage}

