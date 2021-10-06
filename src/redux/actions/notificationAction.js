import { ERROR, RESET_NOTIFICATION, SUCCESS } from '../actionTypes';

// ERROR NOTIFICATIONS
//---------------------------------------------------------------------------------------

export const errorPassEmailAction = () => ({
  type: ERROR,
  payload: {
    textNotification: 'Не правильный пароль/email.',
  },
});

export const errorNetworkAction = () => ({
  type: ERROR,
  payload: {
    textNotification: 'Ошибка!',
  },
});

export const errorEmailExist = () => ({
  type: ERROR,
  payload: {
    textNotification: 'Электронная почта уже существует.',
  },
});

export const errorPasswordDoesNotMatch = () => ({
  type: ERROR,
  payload: {
    textNotification: 'Пароли не совпадают.',
  },
});

export const errorNotAuth = () => ({
  type: ERROR,
  payload: {
    textNotification: 'Для просмотра контента авторизуйтесь',
  },
});

export const errorSongNotFound = () => ({
  type: ERROR,
  payload: {
    textNotification: 'Данная аудиозапись недоступна.',
  },
});

// SUCCESS NOTIFICATIONS
//---------------------------------------------------------------------------------------

export const successAuth = () => ({
  type: SUCCESS,
  payload: {
    textNotification: 'Вы успешно вошли.',
  },
});

export const successRegistration = () => ({
  type: SUCCESS,
  payload: {
    textNotification: 'Вы успешно зарегестрировались.',
  },
});

export const successExit = () => ({
  type: SUCCESS,
  payload: {
    textNotification: 'Вы успешно вышли.',
  },
});

// RESET NOTIFICATION
//---------------------------------------------------------------------------------------

export const resetNotification = () => ({
  type: RESET_NOTIFICATION,
});
