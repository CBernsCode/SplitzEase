import * as CheckActTypes from '../constants/actions/Check';

import { checks } from '../firebase';

// This is for an async function
getCheck = id => {
  // we need to do some stuff then dispatch a function
  return (dispatch) => {
    // Use check reference to get a check reference
    checks.get(id)
      .then(payload => { // get returns a promise so we wait with then
        // we got a document, get its data and update
        dispatch(upadateCheck(payload.data()))
      })
      .catch(err => { console.error("Unable to get check " + err) })
  }
}

// This is for an async function
payCheck = (id, amount) => {
  return (dispatch) => {
    checks.get(id)
      .then(check => {
        let payload = check.data();
        if (payload && payload.amount) {
          // check if op could succeed
          if (payload.amount > amount) {
            // calc value
            payload.amount = payload.amount - amount;
            // write to firestore
            checks.doc(id).set(payload)
              .then(() => {
                // if it works the application state
                dispatch(upadateCheck(payload))
              })
              .catch(err => {
                // Otherwise error and don't do anything
                console.error("Unable to update check " + err)
              })
          }
        }
      })
      .catch(err => { console.error("Unable to get check " + err) })
  }
}

// This is a sync function
// we only pass stuff to the reducer synchronously
upadateCheck = payload => {
  return { type: CheckActTypes.UPDATE_CHECK, payload }
}

export default {
  getCheck,
  payCheck,
}
