import axios from 'axios';
import {
  errorEmailExist,
  errorNetworkAction,
  resetNotification,
  errorPasswordDoesNotMatch,
  successRegistration,
} from './notificationAction';

export const registrationAction = (userData) => (dispatch) => {
  dispatch(resetNotification());
  if (userData.password === userData.copypassword) {
    axios
      .post('/api/auth/signup', {
        ...userData,
      })
      .then((res) => {
        if (res.data.error) {
          dispatch(errorEmailExist());
        } else {
          dispatch(successRegistration());
        }
      })
      .catch(() => {
        dispatch(errorNetworkAction());
      });
  } else {
    dispatch(errorPasswordDoesNotMatch());
  }
};
