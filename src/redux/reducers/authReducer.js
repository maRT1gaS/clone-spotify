import { SUCCESS_AUTH, START_AUTH } from '../actionTypes';

const initionState = {
  isAuth: false,
  name: '',
  email: '',
  id: '',
};

export const authReducer = (state = initionState, action) => {
  switch (action.type) {
    case START_AUTH:
      return {
        isAuth: false,
        name: '',
        email: '',
        id: '',
      };
    case SUCCESS_AUTH:
      return {
        ...state,
        isAuth: true,
        name: action.payload.name,
        email: action.payload.email,
        id: action.payload.id,
      };
    default:
      return state;
  }
};
