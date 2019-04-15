import * as firebase from 'firebase';
import '@firebase/firestore';

import { InviteStatus, PayTypes, SessionStatuses } from './constants/Enums';

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
export const sessions = db.collection('sessions')

export const createSession = (uid, inviteList, restaurant, paytype = PayTypes.unknown) => {
  let seshRef = sessions.doc(uid).collection('sessions').doc()
  let sessionInviteList = []
  
  inviteList.forEach((guest, index) => {
    let iniviteRef = invites.doc(guest).collection('invites').doc()
    sessionInviteList.push({
      id: iniviteRef.id,
      slot: index,
      guest: guest,
    })
    iniviteRef.set({
      restaurant,
      host: uid,
      status: InviteStatus.pending,
      slot: index,
      sessionId: seshRef.id,
      sent: Date.now(),
      paytype,
    })
    .catch(error => console.error(`UID: ${guest}, did not receive and invitation`, error));
  });
  
  seshRef.set({
    sessionId: seshRef.id,
    status: SessionStatuses.started,
    inviteList: sessionInviteList,
    restaurant,
    host: uid,
    paytype: paytype,
    lastChanged: Date.now(),
  }).then(() => {
    console.log("Document written with ID: ", seshRef.id);
  }).catch(err =>  console.error("Unable to create a check " + err) )
}

// createSession('test-user-1', ['test-1', 'test-2', 'test-3'], 'Rollys')

const fakeBill = {
  cost: 120.00,
  sessionId: "",
  host: "123",
  isBuying: false,
  restaurant: "Amer. Test Kitchen",
  perPerson: [
    {
      cost: 20.00,
      uid: "user-1",
    },
    {
      cost: 12.00,
      uid: "user-3",
    },
  ],
  sharedCost: ["user-0", "user-2"]
}

export const sendChecks = (bill) => {
  let shareTotal = bill.cost || 0

  // send individual checks
  bill.perPerson.map(check => {
    let checkRef = checks.doc(check.uid).collection('checks').doc()
    shareTotal -= check.cost
    let chk = {
      restaurant: bill.restaurant,
      cost:  parseFloat(check.cost).toFixed(2),
      id: checkRef.id,
      ts: Date.now(),
    }
    checkRef.set(chk).then(() => {
      console.log("Document written with ID: ", checkRef.id);
    }).catch(err => { console.error("Unable to create a check " + err) })
  })

  if(bill.isBuying){
    let checkRef = checks.doc(bill.host).collection('checks').doc()
    let chk = {
      restaurant: bill.restaurant,
      cost:  parseFloat(bill.cost).toFixed(2),
      id: checkRef.id,
      ts: Date.now(),
    }
    checkRef.set(chk).then(() => {
      console.log("Document written with ID: ", checkRef.id);
    }).catch(err => { console.error("Unable to create a check " + err) })
  } else { // send check shares
    bill.sharedCost.map( check => {
      let checkRef = checks.doc(check).collection('checks').doc()
      let chk = {
        restaurant: bill.restaurant,
        cost: parseFloat(shareTotal / bill.sharedCost.length).toFixed(2),
        id: checkRef.id,
        ts: Date.now(),
      }
      checkRef.set(chk).then(() => {
        console.log("Document written with ID: ", checkRef.id);
      }).catch(err => { console.error("Unable to create a check " + err) })
    })
  }

}

// sendChecks(fakeBill)
// createSession("123", ['user-0', 'user-1', 'user-2', 'user-'], "Test Kitchen")