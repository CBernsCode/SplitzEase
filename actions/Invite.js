import * as InviteActions from '../constants/actions/Invite';
import { PayTypes, InviteStatus } from '../constants/Enums';
import { invites, sessions } from '../firebase.js'

/*
* Sends an invite to guests named in guestList
*/
sendInvites = (invitation, guestList) => {
  return (dispatch) => {
    for (let guest of guestList) {
      invites.doc(guest).collection('invites').add(invitation)
        .catch(error => console.error(`UID: ${guestList}, did not receive and invitation`, error));
    }
  }
}

acceptInvite = (uid, inviteId, payType = PayTypes.share) => {
  return (dispatch) => {
    if (!uid || !inviteId) return
    invites.doc(uid).collection('invites').doc(inviteId).get()
      .then(invite => {
        let payload = !!invite.data ? invite.data() : false;
        if (!!payload) {
          let newInvite = {
            ...payload,
            payType,
            uid,
            id: inviteId,
            status: InviteStatus.accepted
          }
          // Update the user's invite and refresh list
          invites.doc(uid).collection('invites').doc(inviteId).set(newInvite)
          dispatch(getInvites(uid))

          // Update the session's invite information
          const sessionRef = sessions.doc(payload.host).collection('sessions').doc(payload.sessionId)
          sessionRef.get().then(doc => {
            let session = doc.data()

            // if we have an invitelist 
            if (Array.isArray(session.inviteList)) {
              let newList = []
              newList = session.inviteList.filter(it => {
                return it.id !== invite.id
              }).concat(newInvite)
              session.inviteList = newList
              // update the session with the generated invitelist
              sessionRef.set(session)
                .catch(err => console.error("Unable to accept invite in Session " + err))
            }
          })
        }
      }).catch(err => console.error("Unable to accept invite " + err))
  }
}

declineInvite = (uid, inviteId) => {
  return (dispatch) => {
    if (!uid || !inviteId) return
    invites.doc(uid).collection('invites').doc(inviteId).get()
      .then(invite => {
        let payload = !!invite && invite.data();
        if (!!payload) {
          invites.doc(uid).collection('invites').doc(inviteId).set(
            {
              ...payload,
              status: InviteStatus.declined
            })
          dispatch(getInvites(uid))
          const sessionRef = sessions.doc(payload.host).collection('sessions').doc(payload.sessionId)
          sessionRef.get().then(doc => {
            let session = doc.data()
            if (Array.isArray(session.inviteList)) {
              let newList = []
              newList = session.inviteList.filter(it => {
                return it.id !== invite.id
              })
              session.inviteList = newList
              sessionRef.set(session)
                .catch(err => console.error("Unable to accept invite in Session " + err))
            }
          })
        }
      }).catch(err => console.error("Unable to decline invite " + err))

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
        payload.push({ id: doc.id, ...doc.data() })
      });
      dispatch({ type: InviteActions.LOAD_INVITES, payload })
    })
  }
}

MOCK_inviteAccept = (uid, sessionId) => {
  return (dispatch) => {
    const sessionRef = sessions.doc(uid).collection('sessions').doc(sessionId)
    sessionRef.get().then(doc => {
      let session = doc.data()
      console.log( doc.data())
      if (Array.isArray(session.inviteList)) {
        session.inviteList.map(it => {
          dispatch(acceptInvite(it.guest, it.id))
        })
      }
    })
  }
}

export default {
  sendInvites,
  acceptInvite,
  declineInvite,
  getInvite,
  getInvites,
  MOCK_inviteAccept
}