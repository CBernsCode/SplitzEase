import * as SessionActions from '../constants/actions/Session';

const defObj = {
  arr: []
}

export default function sessionReducer(state = defObj, action) {
  switch (action.type) {
    case SessionActions.LOAD_SESSIONS:
      return {
        arr: action.payload
      }
    default:
      return { ...state }
  }
}