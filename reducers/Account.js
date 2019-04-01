import * as AcctActTypes from '../constants/actions/Account'

// something that sets the shape of the reducer/store object
const defObj = {
  user: {
    uid: ""
  }
}

export default function acctReducer(state = defObj, action) {
  switch (action.type) {
    case AcctActTypes.USER_LOGIN:
      return {
        ...state,
        ...action.payload
      }
    case AcctActTypes.USER_LOGOUT:
      return {
        ...defObj
      }
    default:
      return state;
  }
}
