import * as firebase from "firebase/app";
import "firebase/firestore";

export const FS_COLLECTION_LINKS = "links";

const config = {
  apiKey: process.env.REACT_APP_FS_API_KEY,
  authDomain: process.env.REACT_APP_FS_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FS_DB_URL,
  projectId: process.env.REACT_APP_FS_PROJ_ID,
  storageBucket: process.env.REACT_APP_FS_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FS_MSG_SEND_ID,
};

firebase.initializeApp(config);
const db = firebase.firestore();
export default db;
