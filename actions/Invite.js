import * as InviteActions from '../constants/actions/Invite';
import { invites } from '../firebase.js'

/*
* Sends an invite to guests named in guestList
*/
sendInvites = (invitation, guestList) => {
  return (dispatch) => {
    for (let guest of guestList) {
      invites.doc(guest).collection('invites').add(invitation)
        .catch(function (error) {
          console.error(`UID: ${guestList}, did not receive and invitation`, error);
        });
    }
  }
}

acceptInvite = (uid, inviteId) => {
  console.log(inviteId)
  return (dispatch) => {
    invites.doc(uid).collection('invites').doc(inviteId).get()
      .then(invite => {
        let payload = !!invite.data ? invite.data() : false;
        if (!!payload) {
          invites.doc(uid).collection('invites').doc(inviteId).set(
            {
              ...payload,
              accepted: true
            })
        }
      }).catch(err => { console.error("Unable to accept invite " + err) })

    dispatch(getInvites(uid))
  }
}

declineInvite = (uid, inviteId) => {
  return (dispatch) => {
    invites.doc(uid).collection('invites').doc(inviteId).get()
      .then(invite => {
        let payload = !!invite && invite.data();
        if (!!payload) {
          invites.doc(uid).collection('invites').doc(inviteId).set(
            {
              ...payload,
              accepted: false
            })
        }
      }).catch(err => { console.error("Unable to decline invite " + err) })

    dispatch(getInvites(uid))
  }
}

getInvite = (uid, inviteId) => {
  return (dispatch) => {
    invites.doc(uid).collection('invites').doc(inviteId).get()
      .then(doc => {
        return doc.data()
      })
  }
}

getInvites = (uid) => {
  return (dispatch) => {
    invites.doc(uid).collection('invites').get().then((snap) => {
      let payload = [];
      snap.forEach((doc) => {
        // console.log(doc.id + doc.data())
        payload.push({ id: doc.id, ...doc.data() })
      });
      dispatch({ type: InviteActions.LOAD_INVITES, payload })
    })
  }
}


export default {
  sendInvites,
  acceptInvite,
  declineInvite,
  getInvite,
  getInvites,
}