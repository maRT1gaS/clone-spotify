import axios from 'axios';
import {
  START_LOADING,
  SUCCESS_LOADING,
  ERROR_LOADING,
  SONGS,
  ALL,
  ALBUMS,
  ARTISTS,
  ALBUM,
  ARTIST,
  LIBRARY,
} from '../actionTypes';

const startLoading = () => ({
  type: START_LOADING,
});

const successLoading = (data, type) => ({
  type: SUCCESS_LOADING,
  payload: {
    data,
    type,
  },
});

const errorLoading = (textError) => ({
  type: ERROR_LOADING,
  payload: {
    textError,
  },
});

const typeLoading = (type, dispatch, res) => {
  switch (type) {
    case SONGS:
      dispatch(successLoading(res.data, type));
      break;
    case ARTISTS:
      dispatch(successLoading(res.data, type));
      break;
    case ALBUMS:
      dispatch(successLoading(res.data, type));
      break;
    case ALBUM:
      dispatch(successLoading(res.data, type));
      break;
    case ARTIST:
      dispatch(successLoading(res.data, type));
      break;
    case LIBRARY:
      dispatch(successLoading(res.data, type));
      break;
    // ALL - SONGS, ALBUMS, ARTISTS
    case ALL:
      dispatch(successLoading(res.data, type));
      break;
    default:
      break;
  }
};

export const loadingAction = (url, type) => (dispatch) => {
  dispatch(startLoading());
  axios
    .get(`/api${url}`)
    .then((res) => {
      typeLoading(type, dispatch, res);
    })
    .catch(() => {
      dispatch(errorLoading('Ошибка!'));
    });
};
