import * as AcctActTypes from '../constants/actions/Account';


login = (user) => {
  return { type: AcctActTypes.USER_LOGIN, payload: user}
}

logout = () => {
  return { type: AcctActTypes.USER_LOGOUT }
}

export default {
  login,
  logout
}
