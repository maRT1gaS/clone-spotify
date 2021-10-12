import {
  START_LOADING,
  SUCCESS_LOADING,
  ERROR_LOADING,
  ALBUM,
  ARTIST,
  LIBRARY,
  HOME,
  SEARCH,
} from '../actionTypes';

const initionState = {
  isLoading: false,
  textError: '',
  isError: false,
  album: {},
  artist: {},
  search: {
    songs: [],
    artists: [],
    albums: [],
  },
  library: [],
  home: [],
};

export const loadingData = (state = initionState, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        textError: '',
      };
    case SUCCESS_LOADING:
      switch (action.payload.type) {
        case LIBRARY:
          return {
            ...state,
            isLoading: false,
            library: action.payload.data,
          };
        case HOME:
          return {
            ...state,
            isLoading: false,
            home: action.payload.data,
          };
        case ALBUM:
          return {
            ...state,
            isLoading: false,
            album: action.payload.data,
          };
        case ARTIST:
          return {
            ...state,
            isLoading: false,
            artist: action.payload.data,
          };
        case SEARCH:
          return {
            ...state,
            isLoading: false,
            search: action.payload.data,
          };
        default:
          return state;
      }
    case ERROR_LOADING:
      return {
        ...state,
        isLoading: false,
        isError: true,
        textError: action.payload.textError,
      };
    default:
      return state;
  }
};
