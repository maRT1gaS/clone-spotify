import axios from 'axios';
import {
  START_LOADING,
  SUCCESS_LOADING,
  ERROR_LOADING,
  ALBUM,
  ARTIST,
  LIBRARY,
  HOME,
  SEARCH,
} from '../actionTypes';

export const startLoading = () => ({
  type: START_LOADING,
});

export const successLoading = (data, type) => ({
  type: SUCCESS_LOADING,
  payload: {
    data,
    type,
  },
});

export const errorLoading = (textError) => ({
  type: ERROR_LOADING,
  payload: {
    textError,
  },
});

export const typeLoading = (type, dispatch, res) => {
  switch (type) {
    case ALBUM:
      dispatch(successLoading(res.data, type));
      break;
    case ARTIST:
      dispatch(successLoading(res.data, type));
      break;
    case LIBRARY:
      dispatch(successLoading(res.data.library, type));
      break;
    case HOME:
      dispatch(successLoading(res.data, type));
      break;
    case SEARCH:
      dispatch(successLoading(res.data, type));
      break;
    default:
      break;
  }
};

export const loadingAction =
  (url, type, loader = true) =>
  (dispatch) => {
    if (loader) {
      dispatch(startLoading());
    }
    return axios
      .get(`/api${url}`)
      .then((res) => {
        typeLoading(type, dispatch, res);
      })
      .catch((error) => {
        dispatch(errorLoading('Ошибка!'));
        return error;
      });
  };
