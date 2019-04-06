import * as CheckActTypes from '../constants/actions/Check';
import * as defaults from '../constants/DefaultObjs';

import { checks, invites } from '../firebase';

// This is for an async function
getCheck = (uid, id) => {
  // we need to do some stuff then dispatch a function
  return (dispatch) => {
    const checkRef = checks.doc(uid).collection('checks').doc(id)
    // Use check reference to get a check reference
    checkRef.get()
      .then(payload => { // get returns a promise so we wait with then
        // we got a document, get its data and update
        dispatch({type: CheckActTypes.SELECT_SKU, payload: payload.data() })
      })
      .catch(err => { console.error("Unable to get check " + err) })
  }
}

// This is for an async function
payCheck = (uid, id, amount) => {
  return (dispatch) => {
    const checkRef = checks.doc(uid).collection('checks').doc(id)

    checkRef.get().then(check => {
      let payload = check.data();
      if (payload && payload.price) {
        // check if op could succeed
        if (payload.price > amount) {
          // calc value
          payload.price = parseFloat(payload.price - amount);
          // write to firestore
          checkRef.set(payload)
            .then(() => {
              // if it works the application state
              dispatch(updateCheck(payload))
            })
            .catch(err => {
              // Otherwise error and don't do anything
              console.error("Unable to update check " + err)
            })
        }
      }
      dispatch(getCheck(uid, id))
      dispatch(getChecks(uid))
    })
    .catch(err => { console.error("Unable to get check " + err) })
  }
}

createCheck = (uid, check) => {
  return (dispatch) => {
    const checkRef = checks.doc(uid).collection('checks').doc()
    check = {
      ...defaults.defaultCheck,
      ...check,
      id: checkRef.id,
    }
    checkRef.set(check).then(() => {
      dispatch(getChecks(uid))
      console.log("Document written with ID: ", checkRef.id);
    }).catch(err => { console.error("Unable to create a check " + err) })
  }
}

getChecks = (uid) => {
  return (dispatch) => {
    checks.doc(uid).collection('checks').get()
      .then((snap) => {
        let payload = [];
        snap.forEach((doc) => {
          // console.log(doc.id + doc.data())
          payload.push({ ...doc.data() })
        });
        dispatch({ type: CheckActTypes.GET_CHECKS, payload })
      }).catch(err => { console.error("Unable to get checks " + err) })
  }
}

// This is a sync function
// we only pass stuff to the reducer synchronously
updateCheck = payload => {
  return { type: CheckActTypes.UPDATE_CHECK, payload }
}

export default {
  createCheck,
  getCheck,
  getChecks,
  payCheck,
  updateCheck,
}
