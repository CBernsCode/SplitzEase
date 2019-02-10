import {
  UPDATE_CHECK
} from '../constants/actions/Check';

const defObj = {
  id: "",
  amount:"",
}

export default function checkReducer(state = defObj, action){
  switch (action.type) {
    case UPDATE_CHECK:
      return {
        ...action.payload
      }
    default:
      return state;
  }
}
