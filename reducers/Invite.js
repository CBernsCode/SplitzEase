import * as InviteActions from '../constants/actions/Invite';

const defObj = {
  friends: []
}

export default function frndReducer(state = defObj, action) {
  switch (action.type) {
    case InviteActions.LOAD_INVITES:
      return {
        arr: action.payload
      }
    default:
      return { ...state };
  }
}