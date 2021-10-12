import axios from 'axios';
import { SUCCESS_AUTH, START_AUTH, LOG_OUT } from '../actionTypes';
import {
  errorPassEmailAction,
  errorNetworkAction,
  successAuth,
  emptyInput,
} from './notificationAction';

const startAuthAction = () => ({
  type: START_AUTH,
});

export const successAuthAction = (data) => ({
  type: SUCCESS_AUTH,
  payload: {
    isAuth: true,
    name: data.name,
    email: data.email,
  },
});

export const logOutAction = () => ({
  type: LOG_OUT,
});

export const authorisationAction = (authData) => (dispatch) => {
  const { email, password } = authData;
  if (email.length === 0 || password.length === 0) {
    dispatch(emptyInput());
    return;
  }
  dispatch(startAuthAction());
  axios
    .post('/api/auth/signin', {
      ...authData,
    })
    .then((res) => {
      if (res.data.error) {
        dispatch(errorPassEmailAction());
      } else {
        dispatch(successAuth());
        const userData = {
          name: res.data.name,
          email: res.data.email,
        };
        sessionStorage.setItem('userData', JSON.stringify(userData));
        dispatch(successAuthAction(res.data));
      }
    })
    .catch(() => {
      dispatch(errorNetworkAction());
    });
};
