import axios from 'axios';
import { SUCCESS_AUTH, START_AUTH, LOG_OUT } from '../actionTypes';
import { errorNotification, successNotification } from './notificationAction';

export const startAuthAction = () => ({
  type: START_AUTH,
});

export const successAuthAction = (userData) => {
  const { role, name, email } = userData;
  return {
    type: SUCCESS_AUTH,
    payload: {
      role,
      name,
      email,
    },
  };
};

export const logOutAction = () => ({
  type: LOG_OUT,
});

export const authorisationAction = (authData) => (dispatch) => {
  const { email, password } = authData;
  if (email.length === 0 || password.length === 0) {
    dispatch(errorNotification('Все поля обязательны!'));
    return;
  }
  dispatch(startAuthAction());
  axios
    .post('/api/auth/signin', {
      ...authData,
    })
    .then((res) => {
      if (res.data.error) {
        dispatch(errorNotification('Не правильный пароль/email.'));
      } else {
        dispatch(successNotification('Вы успешно вошли.'));
        dispatch(successAuthAction(res.data));
      }
    })
    .catch(() => {
      dispatch(errorNotification('Ошибка!'));
    });
};
