import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { notificationReducer } from './notificationReducer';
import { loadingReducer } from './loadingReducer';

const rootReducer = combineReducers({
  authReducer,
  notificationReducer,
  loadingReducer,
});

export default rootReducer;
