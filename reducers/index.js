import { createStore, combineReducers, applyMiddleware } from 'redux';
import acctReducer  from './Account';
import checkReducer from './Checks';
import frndReducer from './Friends';
import inviteReducer from './Invites';
import sessionReducer from './Sessions';

import thunk from 'redux-thunk';

const reducer = combineReducers({
  acctReducer,
  checkReducer,
  frndReducer,
  inviteReducer,
  sessionReducer
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;
