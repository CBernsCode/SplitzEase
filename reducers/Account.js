import {
  USER_LOGIN,
  USER_LOGOUT
} from '../constants/actions/Account';

// something that sets the shape of the reducer/store object
const defObj = {
  account: undefined,
  userId: 0,
  userName: "",
  friends: [],
  blocked: [],
  invitesId: ""
}

export default function acctReducer(state = defObj, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        ...action.payload
      }
    case USER_LOGOUT:
      return {
        ...defObj
      }
    default:
      return state;
  }
}
