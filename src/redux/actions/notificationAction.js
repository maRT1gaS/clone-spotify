import {
  ERROR_NOTIFICATION,
  RESET_NOTIFICATION,
  SUCCESS_NOTIFICATION,
} from '../actionTypes';

export const errorNotification = (textNotification) => ({
  type: ERROR_NOTIFICATION,
  payload: {
    textNotification,
  },
});

export const successNotification = (textNotification) => ({
  type: SUCCESS_NOTIFICATION,
  payload: {
    textNotification,
  },
});

export const resetNotification = () => ({
  type: RESET_NOTIFICATION,
});
