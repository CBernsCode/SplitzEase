import { createStore, combineReducers, applyMiddleware } from 'redux';
import acctReducer  from './Account';
import checkReducer from './Checks';
import frndReducer from './Friends';
import inviteReducer from './Invite';

import thunk from 'redux-thunk';

const reducer = combineReducers({
  acctReducer,
  checkReducer,
  frndReducer,
  inviteReducer
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;
