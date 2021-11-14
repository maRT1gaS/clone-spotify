import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';

import {
  startAuthAction,
  successAuthAction,
  logOutAction,
} from '../authAction';
import { SUCCESS_AUTH, START_AUTH, LOG_OUT } from '../../actionTypes';

jest.mock('js-cookie', () => ({
  get: () =>
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjc1ODRhY2VhNWU5M2IxZmNkNjQzOSIsIm5hbWUiOiJEaW1hIiwiZW1haWwiOiJkZGRkZEBoaGgucnV1Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM1OTM5MjQ4fQ.j4jg-wiONDHogmt36cD98KXPNpZVYv4z9Mc2dvTQc8k',
}));

describe('Testing action auth', () => {
  it('actionCreater - logOut', () => {
    const logOut = logOutAction();
    expect(logOut).toEqual({ type: LOG_OUT });
  });

  it('actionCreater - startAuth', () => {
    const startAuth = startAuthAction();
    expect(startAuth).toEqual({ type: START_AUTH });
  });

  it('actionCreater - successAuth with token', () => {
    const token = Cookie.get();
    const decodeData = jwtDecode(token);

    const auth = successAuthAction(decodeData);
    expect(auth).toEqual({
      type: SUCCESS_AUTH,
      payload: { role: 'admin', name: 'Dima', email: 'ddddd@hhh.ruu' },
    });
  });
});
