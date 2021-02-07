import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from './auth';
import teams from './teams';

const rootReducer = combineReducers({
  auth,
  teams,
  routing: routerReducer,
})

export default rootReducer;