import axios from 'axios';
import { START_LOADING, SUCCESS_LOADING, ERROR_LOADING } from '../actionTypes';

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

const errorLoading = () => ({
  type: ERROR_LOADING,
});

export const loadingAction =
  (url, type, params = null) =>
  (dispatch) => {
    dispatch(startLoading());
    if (!params) {
      axios
        .get(`/api${url}`)
        .then((res) => {
          switch (type) {
            case 'HOME':
              dispatch(successLoading(res.data, type));
              break;
            case 'SEARCH': {
              dispatch(successLoading(res.data, type));
              break;
            }
            default:
              dispatch(errorLoading());
              break;
          }
        })
        .catch(() => {
          dispatch(errorLoading());
        });
    } else {
      axios
        .get(`/api${url}`, {
          params,
        })
        .then((res) => {
          dispatch(successLoading(res.data.library, type));
        })
        .catch(() => {
          dispatch(errorLoading());
        });
    }
  };
