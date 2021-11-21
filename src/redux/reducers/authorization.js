import { SUCCESS_AUTH, START_AUTH } from '../actionTypes';

const initionState = {
  isAuth: false,
  name: '',
  email: '',
  role: '',
};

export const authorization = (state = initionState, action) => {
  switch (action.type) {
    case START_AUTH:
      return {
        isAuth: false,
        name: '',
        email: '',
        role: '',
      };
    case SUCCESS_AUTH:
      return {
        ...state,
        isAuth: true,
        name: action.payload.name,
        email: action.payload.email,
        role: action.payload.role,
      };
    default:
      return state;
  }
};
