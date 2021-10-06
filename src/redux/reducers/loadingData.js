import {
  START_LOADING,
  SUCCESS_LOADING,
  ERROR_LOADING,
  SONGS,
  ARTISTS,
  ALBUMS,
  ALL,
  ALBUM,
  ARTIST,
  LIBRARY,
} from '../actionTypes';

const initionState = {
  isLoading: false,
  textError: '',
  isError: false,
  songs: [],
  album: {},
  albums: [],
  artist: {},
  artists: [],
  library: {},
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
        case SONGS:
          return {
            ...state,
            isLoading: false,
            songs: action.payload.data,
          };
        case ARTISTS:
          return {
            ...state,
            isLoading: false,
            artists: action.payload.data,
          };
        case ALBUMS:
          return {
            ...state,
            isLoading: false,
            albums: action.payload.data,
          };
        case LIBRARY:
          return {
            ...state,
            isLoading: false,
            library: action.payload.data,
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
        // ALL - SONGS, ALBUMS, ARTISTS
        case ALL:
          return {
            ...state,
            isLoading: false,
            songs: action.payload.data.songs,
            albums: action.payload.data.albums,
            artists: action.payload.data.artists,
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
