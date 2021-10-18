import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';
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

export const successAuthAction = () => {
  const token = Cookie.get('TOKEN');
  if (token) {
    const decoded = jwtDecode(token);
    const { role, name, email } = decoded;
    return {
      type: SUCCESS_AUTH,
      payload: {
        isAuth: true,
        role,
        name,
        email,
      },
    };
  }
  return false;
};

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
        dispatch(successAuthAction(res.data));
      }
    })
    .catch(() => {
      dispatch(errorNetworkAction());
    });
};
