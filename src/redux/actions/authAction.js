import axios from 'axios';
import { SUCCESS_AUTH, START_AUTH } from '../actionTypes';
import {
  errorPassEmailAction,
  errorNetworkAction,
  resetNotification,
  successAuth,
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

export const authorisationAction = (authData) => (dispatch) => {
  dispatch(startAuthAction());
  dispatch(resetNotification());
  axios
    .post('/api/auth/signin', {
      ...authData,
    })
    .then((res) => {
      if (res.data.error) {
        dispatch(errorPassEmailAction());
      } else {
        dispatch(successAuth());
        const userDara = {
          name: res.data.name,
          email: res.data.email,
        };
        sessionStorage.setItem('userDara', JSON.stringify(userDara));
        dispatch(successAuthAction(res.data));
      }
    })
    .catch(() => {
      dispatch(errorNetworkAction());
    });
};
