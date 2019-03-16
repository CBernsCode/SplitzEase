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


/*
* Sends an invite to guests named in guestList
*/
export const sendInvites = (invitation, guestList) => {
  for(let guest of guestList){
    invites.doc(guest).collection('invites').add(invitation)
      .catch(function(error) {
        console.error(`UID: ${guestList}, did not receive and invitation`, error);
      });
  }
}