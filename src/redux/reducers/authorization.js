import { SUCCESS_AUTH, START_AUTH, LOG_OUT } from '../actionTypes';

const initionState = {
  isAuth: false,
  name: '',
  email: '',
};

export const authorization = (state = initionState, action) => {
  switch (action.type) {
    case START_AUTH:
      return {
        isAuth: false,
        name: '',
        email: '',
      };
    case SUCCESS_AUTH:
      return {
        ...state,
        isAuth: true,
        name: action.payload.name,
        email: action.payload.email,
      };
    case LOG_OUT:
      return {
        ...state,
        isAuth: false,
        name: '',
        email: '',
      };
    default:
      return state;
  }
};
