import { START_LOADING, SUCCESS_LOADING, ERROR_LOADING } from '../actionTypes';

const initionState = {
  isLoading: false,
  isError: false,
  recomendationMusic: [],
  searchData: {
    songs: [],
    albums: [],
    artists: [],
  },
  librarySongs: [],
};

export const loadingReducer = (state = initionState, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SUCCESS_LOADING:
      switch (action.payload.type) {
        case 'HOME':
          return {
            ...state,
            isLoading: false,
            recomendationMusic: action.payload.data,
          };
        case 'SEARCH':
          return {
            ...state,
            isLoading: false,
            searchData: action.payload.data,
          };
        case 'LIBRARY':
          return {
            ...state,
            isLoading: false,
            librarySongs: action.payload.data,
          };
        default:
          return state;
      }
    case ERROR_LOADING:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
