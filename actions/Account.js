import * as AcctActTypes from '../constants/actions/Account';


login = (user) => {
  return { type: AcctActTypes.USER_LOGIN, payload: user}
}

logout = () => {
  return { type: AcctActTypes.USER_LOGOUT }
}

setBalance = (payload) => {
  return { type: AcctActTypes.SET_BALANCE, payload}
}

export default {
  login,
  logout,
  setBalance
}
