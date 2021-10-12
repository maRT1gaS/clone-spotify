import axios from 'axios';
import {
  errorEmailExist,
  errorNetworkAction,
  errorPasswordDoesNotMatch,
  successRegistration,
  errorPasswordLength,
  emptyInput,
} from './notificationAction';

export const registrationAction = (userData) => (dispatch) => {
  const { name, email, password, copypassword } = userData;
  if (
    name.length === 0 ||
    email.length === 0 ||
    password.length === 0 ||
    copypassword.length === 0
  ) {
    dispatch(emptyInput());
    return;
  }
  if (password.length < 8) {
    dispatch(errorPasswordLength());
    return;
  }
  if (password !== copypassword) {
    dispatch(errorPasswordDoesNotMatch());
    return;
  }
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
};
