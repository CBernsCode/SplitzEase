import * as FriendActTypes from '../constants/actions/Friends';

const defObj = {
  arr:[]
}

export default function frndReducer(state = defObj, action) {
  let prevState = [].push(state)
  switch (action.type) {
    case FriendActTypes.ADD_FRIEND:
      return {
        ...state,
        arr:[...state.arr, action.payload]
      }
    case FriendActTypes.REMOVE_FRIEND:
      return {
        ...state,
        arr: state.arr.filter(it => { return it !== action.payload.id })
      }
    case FriendActTypes.LOAD_FRIENDS:
      return { ...state };
    default:
      return { ...state };
  }
}