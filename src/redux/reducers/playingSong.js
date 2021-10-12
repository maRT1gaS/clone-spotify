import {
  START_SONG,
  CONTROL_SONG,
  UPDATE_VOLUME,
  REPEAT_TOGGLE,
} from '../actionTypes';

const initionState = {
  currentSong: {},
  playingPlaylist: [],
  volume: '0.5',
  isPlayingSong: false,
  isRepeat: false,
  event: '',
};

export const playingSong = (state = initionState, action) => {
  switch (action.type) {
    case START_SONG:
      if (state.playingPlaylist === action.payload.data.playingPlaylist) {
        return {
          ...state,
          currentSong: action.payload.data.currentSong,
          event: action.payload.event,
        };
      }
      return {
        ...state,
        playingPlaylist: action.payload.data.playingPlaylist,
        currentSong: action.payload.data.currentSong,
        event: action.payload.event,
      };

    case CONTROL_SONG:
      return {
        ...state,
        isPlayingSong: !state.isPlayingSong,
      };
    case UPDATE_VOLUME:
      return {
        ...state,
        volume: action.payload.value,
      };
    case REPEAT_TOGGLE:
      return {
        ...state,
        isRepeat: !state.isRepeat,
      };
    default:
      return state;
  }
};
