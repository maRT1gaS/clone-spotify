import { ERROR, RESET_NOTIFICATION, SUCCESS } from '../actionTypes';

const initionState = {
  notification: false,
  typeNotification: '',
  textNotification: '',
};

export const notificationReducer = (state = initionState, action) => {
  switch (action.type) {
    case ERROR:
      return {
        notification: true,
        typeNotification: 'error',
        textNotification: action.payload.textNotification,
      };
    case SUCCESS:
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
