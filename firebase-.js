import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDT_ASKeL6wuhX381fjfeX8QPvrBXtdUwE",
  authDomain: "lvlupgames-427d6.firebaseapp.com",
  projectId: "lvlupgames-427d6",
  storageBucket: "lvlupgames-427d6.appspot.com",
  messagingSenderId: "445110368031",
  appId: "1:445110368031:web:df2f8b4e17275bc4a9622a",
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
