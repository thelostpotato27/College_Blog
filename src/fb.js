import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZC7XS72Le5NKEqmquCCRDizPmjp4eolU",
  authDomain: "calendar-demo-55791.firebaseapp.com",
  databaseURL: "https://calendar-demo-55791.firebaseio.com",
  projectId: "calendar-demo-55791",
  storageBucket: "calendar-demo-55791.appspot.com",
  messagingSenderId: "935297313821",
  appId: "1:935297313821:web:3b62807b70c32ad251aaf4",
  measurementId: "G-T35XXHP7G8"
};

firebase.initializeApp(firebaseConfig);

const fauth = firebase.auth();
const fstore = firebase.firestore();

export { firebase, fauth, fstore };
