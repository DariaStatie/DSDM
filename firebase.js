import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBtdhGGXDQjwz4XVo1CWrCV67NbPw7LNrs",
  authDomain: "dsdmapp.firebaseapp.com",
  projectId: "dsdmapp",
  storageBucket: "dsdmapp.appspot.com",
  messagingSenderId: "366326062737",
  appId: "1:366326062737:web:7405d14ecffda2a7072930",
  measurementId: "G-1YPVC0N62Y"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getFirestore();


export {
  auth,
  database
}