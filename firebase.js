import * as firebase from 'firebase';
import '@firebase/firestore';

var config = {
  apiKey: "AIzaSyBVKzhG8Mi7-k9bbePV71YPTnhBsWG6-L0",
  authDomain: "splitzease-d106e.firebaseapp.com",
  databaseURL: "https://splitzease-d106e.firebaseio.com",
  projectId: "splitzease-d106e",
  storageBucket: "splitzease-d106e.appspot.com",
  messagingSenderId: "699584016788"
};

firebase.initializeApp(config);
const db = firebase.firestore();
export const invites = db.collection('invites')
export const checks = db.collection('checks')
export const friends = db.collection('friends')
export const users = db.collection('users')
