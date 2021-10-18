import { OPEN_MODAL, CLOSE_MODAL } from '../actionTypes';

export const openModal = (typeModal) => ({
  type: OPEN_MODAL,
  typeModal,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});
