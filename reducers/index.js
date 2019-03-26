import { createStore, combineReducers, applyMiddleware } from 'redux';
import acctReducer  from './Account';
import checkReducer from './Checks';
import frndReducer from './Friends';

import thunk from 'redux-thunk';

const reducer = combineReducers({
  acctReducer,
  checkReducer,
  frndReducer
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;
