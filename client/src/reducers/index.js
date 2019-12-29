import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';

export default combineReducers({
  alert,
  auth,
  profile
});

/* 
// import { alertReducer } from './alert';

export default combineReducers({
  alert: alertReducer
});
*/
