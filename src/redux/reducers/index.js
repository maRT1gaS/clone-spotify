import { combineReducers } from 'redux';
import { authorization } from './authorization';
import { notification } from './notification';
import { loadingData } from './loadingData';
import { playingSong } from './playingSong';
import { uiState } from './uiState';
import { LOG_OUT } from '../actionTypes';

const rootReducer = combineReducers({
  authorization,
  notification,
  loadingData,
  playingSong,
  uiState,
});

export default (state, action) =>
  rootReducer(action.type === LOG_OUT ? undefined : state, action);
