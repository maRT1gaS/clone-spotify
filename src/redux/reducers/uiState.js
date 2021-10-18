import { OPEN_MODAL, CLOSE_MODAL } from '../actionTypes';

const initionState = {
  isOpen: false,
  typeModal: '',
};

export const uiState = (state = initionState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        isOpen: true,
        typeModal: action.typeModal,
      };
    case CLOSE_MODAL:
      return {
        isOpen: false,
        typeModal: '',
      };
    default:
      return state;
  }
};
