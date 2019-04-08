import * as FriendActTypes from '../constants/actions/Friends';

const defObj = {
  arr: []
}

export default function frndReducer(state = defObj, action) {
  switch (action.type) {
    // case FriendActTypes.ADD_FRIEND:
    //   return {
    //     ...state,
    //     arr: [...state.arr, action.payload]
    //   }
    // case FriendActTypes.REMOVE_FRIEND:
    //   return {
    //     ...state,
    //     arr: state.arr.filter(it => { return it !== action.payload.id })
    //   }
    case FriendActTypes.LOAD_FRIENDS:
      return {
        arr: action.payload
      }
    default:
      return { ...state }
  }
}