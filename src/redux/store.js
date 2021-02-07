import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';

const checkTokenExpirationMiddleware = store => next => action => {
  next(action);
};
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, checkTokenExpirationMiddleware)
);

export default store;