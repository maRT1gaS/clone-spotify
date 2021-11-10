import {
  ERROR_NOTIFICATION,
  RESET_NOTIFICATION,
  SUCCESS_NOTIFICATION,
} from '../actionTypes';

const initionState = {
  notification: false,
  typeNotification: '',
  textNotification: '',
};

export const notification = (state = initionState, action) => {
  switch (action.type) {
    case ERROR_NOTIFICATION:
      return {
        notification: true,
        typeNotification: 'error',
        textNotification: action.payload.textNotification,
      };
    case SUCCESS_NOTIFICATION:
      return {
        ...state,
        notification: true,
        typeNotification: 'success',
        textNotification: action.payload.textNotification,
      };
    case RESET_NOTIFICATION:
      return {
        notification: false,
        typeNotification: '',
        textNotification: '',
      };
    default:
      return state;
  }
};
