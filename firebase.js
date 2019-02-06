import firebase from 'firebase';
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
export default firebase;

const db = firebase.firestore();
export const invites = db.collection('invites')

export function getInvite(id){
  invites.doc(id).get().then(doc => {
    let defObj = { hostname: "", hostid: "", partymembers: []}
    let data = { ... defObj, ...doc.data() }
    console.log(data);
  })
}

