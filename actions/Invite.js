import * as InviteActions from '../constants/actions/Invite';

/*
* Sends an invite to guests named in guestList
*/
sendInvites = (invitation, guestList) => {
  return dispatch => {
    for (let guest of guestList) {
      invites.doc(guest).collection('invites').add(invitation)
        .catch(function (error) {
          console.error(`UID: ${guestList}, did not receive and invitation`, error);
        });
    }
  }
}

acceptInvite = (uid, inviteId) => {
  return dispatch => {
    let inviteRef = invites.doc(uid).collection('invites')
    inviteRef.get(inviteId)
      .then(invite => {
        let payload = invite.data();
        checks.doc(id).set({ ...payload, accepted: true })
      }).catch(err => { console.error("Unable to accept invite " + err) })

      dispatch(getInvites(uid))
  }
}

declineInvite = (uid, inviteId) => {
  return dispatch => {
    let inviteRef = invites.doc(uid).collection('invites')
    inviteRef.get(inviteId)
      .then(invite => {
        let payload = invite.data();
        checks.doc(id).set({ ...payload, accepted: false })
      }).catch(err => { console.error("Unable to decline invite " + err) })

      dispatch(getInvites(uid))
  }
}

getInvite = (uid, inviteId) => {
  return dispatch => {
    invites.doc(uid).collection('invites').get(inviteId)
      .then(doc => {
        return doc.data()
      })
  }
}

getInvites = (uid) => {
  return dispatch => {
    invites.doc(uid).collection('invites').get()
      .then(doc => {
        if(doc){
          dispatch({
            type: InviteActions.LOAD_INVITES,
            payload: doc.data()
          })
        } else {
          console.error("Unable to get Invites")
        }
      })
  }
}

export default {
  sendInvites,
  acceptInvite,
  declineInvite,
  getInvite,
}