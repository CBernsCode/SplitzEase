import { createStore, combineReducers, applyMiddleware } from 'redux';
import acctReducer  from './Account';
import checkReducer from './Check';

import thunk from 'redux-thunk';

const reducer = combineReducers({
  acctReducer,
  checkReducer
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;
