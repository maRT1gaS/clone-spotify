import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
  startLoading,
  errorLoading,
  successLoading,
  loadingAction,
} from '../loadingAction';
import {
  START_LOADING,
  ERROR_LOADING,
  SUCCESS_LOADING,
  HOME,
} from '../../actionTypes';
import { songsHome } from '../../../../__mocks__/loadingData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mock = new MockAdapter(axios);
const store = mockStore();

describe('Testing action loading', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('actionCreater - startLoading', () => {
    const start = startLoading();
    expect(start).toEqual({ type: START_LOADING });
  });

  it('actionCreater - errorLoading', () => {
    const textError = 'Проверьте подключение к интеренету.';
    const error = errorLoading(textError);
    expect(error).toEqual({ type: ERROR_LOADING, payload: { textError } });
  });

  it('actionCreater - successLoading', () => {
    const success = successLoading(songsHome, 'HOME');
    expect(success).toEqual({
      type: SUCCESS_LOADING,
      payload: { data: songsHome, type: 'HOME' },
    });
  });

  it('async actionCreater - loadingAction(HOME) - error', () => {
    mock
      .onGet('http://localhost:5000/')
      .reply(400, { error: { message: 'message error' } });
    store.dispatch(loadingAction('/recommendations', HOME)).then(() => {
      const expectedActions = [
        { type: START_LOADING },

        {
          type: ERROR_LOADING,
          payload: { textError: 'Ошибка!' },
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('async actionCreater - loadingAction(HOME) - success with loader', () => {
    mock.onGet('/api/recommendations').reply(200, { response: songsHome });
    store.dispatch(loadingAction('/recommendations', HOME)).then(() => {
      const expectedActions = [
        { type: START_LOADING },

        {
          type: SUCCESS_LOADING,
          payload: { data: { response: songsHome }, type: HOME },
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('async actionCreater - loadingAction(HOME) - success without loader', () => {
    mock.onGet('/api/recommendations').reply(200, { response: songsHome });
    store.dispatch(loadingAction('/recommendations', HOME, false)).then(() => {
      const expectedActions = [
        {
          type: SUCCESS_LOADING,
          payload: { data: { response: songsHome }, type: HOME },
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
