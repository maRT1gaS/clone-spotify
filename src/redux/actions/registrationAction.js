import axios from 'axios';
import { errorNotification, successNotification } from './notificationAction';

export const registrationAction = (userData) => (dispatch) => {
  const { name, email, password, copypassword } = userData;
  if (
    name.length === 0 ||
    email.length === 0 ||
    password.length === 0 ||
    copypassword.length === 0
  ) {
    dispatch(errorNotification('Все поля обязательны!'));
    return;
  }
  if (password.length < 8) {
    dispatch(errorNotification('Длина пароля должна быть больше 8'));
    return;
  }
  if (password !== copypassword) {
    dispatch(errorNotification('Пароли не совпадают.'));
    return;
  }
  axios
    .post('/api/auth/signup', {
      ...userData,
    })
    .then((res) => {
      if (res.data.error) {
        dispatch(errorNotification('Электронная почта уже существует.'));
      } else {
        dispatch(successNotification('Вы успешно зарегестрировались.'));
      }
    })
    .catch(() => {
      dispatch(errorNotification('Ошибка!'));
    });
};
