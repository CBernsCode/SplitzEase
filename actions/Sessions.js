import * as SessionActions from '../constants/actions/Session';
import { InviteStatus, PayTypes, SessionStatuses } from '../constants/Enums';

import { invites, sessions } from '../firebase';

createSession = (uid, inviteList, restaurant, paytype = PayTypes.unknown) => {
  return dispatch => {
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
    }).catch(err => console.error("Unable to create a check " + err))
  }
}

export const sendChecks = (bill) => {
  return dispatch => {
    let shareTotal = bill.cost || 0

    // send individual checks
    bill.perPerson.map(check => {
      let checkRef = checks.doc(check.uid).collection('checks').doc()
      shareTotal -= check.cost
      let chk = {
        restaurant: bill.restaurant,
        cost: parseFloat(check.cost).toFixed(2),
        id: checkRef.id,
        ts: Date.now(),
      }
      checkRef.set(chk).then(() => {
        console.log("Document written with ID: ", checkRef.id);
      }).catch(err => { console.error("Unable to create a check " + err) })
    })

    if (bill.isBuying) {
      let checkRef = checks.doc(bill.host).collection('checks').doc()
      let chk = {
        restaurant: bill.restaurant,
        cost: parseFloat(bill.cost).toFixed(2),
        id: checkRef.id,
        ts: Date.now(),
      }
      checkRef.set(chk).then(() => {
        console.log("Document written with ID: ", checkRef.id);
      }).catch(err => { console.error("Unable to create a check " + err) })
    } else { // send check shares
      bill.sharedCost.map(check => {
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
}

loadSessions = (uid) => {
  return dispatch => {
    sessions.doc(uid).collection('sessions').get()
      .then((snap) => {
        let payload = [];
        snap.forEach((doc) => {
          // console.log(doc.id + doc.data())
          payload.push({ ...doc.data() })
        });
        dispatch({ type: SessionActions.LOAD_SESSIONS, payload })
      }).catch(err => { console.error("Unable to get sessions " + err) })
  }
}

export default {
  createSession,
  loadSessions,
  sendChecks,
}