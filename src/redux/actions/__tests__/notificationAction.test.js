import {
  successNotification,
  errorNotification,
  resetNotification,
} from '../notificationAction';
import {
  ERROR_NOTIFICATION,
  SUCCESS_NOTIFICATION,
  RESET_NOTIFICATION,
} from '../../actionTypes';

describe('Testing action notification', () => {
  it('actionCreater - successNotification', () => {
    const textNotification = 'Успешно!';
    const success = successNotification(textNotification);
    expect(success).toEqual({
      type: SUCCESS_NOTIFICATION,
      payload: {
        textNotification,
      },
    });
  });

  it('actionCreater - errorNotification', () => {
    const textNotification = 'Ошибка!';
    const error = errorNotification(textNotification);
    expect(error).toEqual({
      type: ERROR_NOTIFICATION,
      payload: {
        textNotification,
      },
    });
  });

  it('actionCreater - resetNotification', () => {
    const reset = resetNotification();
    expect(reset).toEqual({
      type: RESET_NOTIFICATION,
    });
  });
});
