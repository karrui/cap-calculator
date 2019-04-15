import * as firebase from "firebase/app";
import "firebase/firestore";

export const FS_COLLECTION_LINKS = "links";

const config = {
  apiKey: "AIzaSyAQ9eZZbmDbnZ3ssONfwMFDnz8qVpEUDCE",
  authDomain: "cap-calculator-1aab8.firebaseapp.com",
  databaseURL: "https://cap-calculator-1aab8.firebaseio.com",
  projectId: "cap-calculator-1aab8",
  storageBucket: "cap-calculator-1aab8.appspot.com",
  messagingSenderId: "417697808754",
};

firebase.initializeApp(config);
const db = firebase.firestore();
export default db;
