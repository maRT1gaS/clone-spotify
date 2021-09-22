import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { notificationReducer } from './notificationReducer';

const rootReducer = combineReducers({
  authReducer,
  notificationReducer,
});

export default rootReducer;
