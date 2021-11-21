import { openModal, closeModal } from '../uiStateAction';
import { OPEN_MODAL, CLOSE_MODAL } from '../../actionTypes';

describe('Testing action uiState', () => {
  it('actionCreater - openModal', () => {
    const open = openModal('infoUser');
    expect(open).toEqual({ type: OPEN_MODAL, typeModal: 'infoUser' });
  });

  it('actionCreater - closeModal', () => {
    const close = closeModal();
    expect(close).toEqual({ type: CLOSE_MODAL });
  });
});
