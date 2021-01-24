import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBOWkTxW5YW-zomvAmflSXk26GxUpbp8BQ",
  authDomain: "trisquareasia-4d75e.firebaseapp.com",
  projectId: "trisquareasia-4d75e",
  storageBucket: "trisquareasia-4d75e.appspot.com",
  messagingSenderId: "633616135180",
  appId: "1:633616135180:web:a603b27dea60e5dfb2ea29",
  measurementId: "G-9WYJGLDHW8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
// const authData = auth.currentUser()
const storage = firebaseApp.storage();
const database = firebaseApp.database()
// const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, database };
