import { combineReducers } from 'redux';
import { authorization } from './authorization';
import { notification } from './notification';
import { loadingData } from './loadingData';
import { playingSong } from './playingSong';

const rootReducer = combineReducers({
  authorization,
  notification,
  loadingData,
  playingSong,
});

export default rootReducer;
