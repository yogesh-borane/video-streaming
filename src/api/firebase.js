// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBdcsymbw2xzZNvtmWsaMji4h7HV-F8Zms",
  authDomain: "streambase-f552c.firebaseapp.com",
  projectId: "streambase-f552c",
  storageBucket: "streambase-f552c.appspot.com",
  messagingSenderId: "67584761950",
  appId: "1:67584761950:web:7c3016829240548ae894cf",
};

// Initialize Firebase

const firebase = initializeApp(firebaseConfig);
export let auth = getAuth(firebase);
export let storage=getStorage(firebase);
export default firebase;
