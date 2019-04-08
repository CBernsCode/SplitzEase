import * as CheckActTypes from '../constants/actions/Check';

const defObj = {
  arr: [],
  selected: "",
}

export default function checkReducer(state = defObj, action){
  switch (action.type) {
    case CheckActTypes.GET_CHECKS:
      return {
          ...state,
          arr: action.payload
      }
    case CheckActTypes.SELECT_SKU:
      return {
        ...state,
        selected: action.payload
      }  
    default:
      return state;
  }
}
