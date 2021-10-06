import {
  START_SONG,
  CONTROL_SONG,
  UPDATE_VOLUME,
  PLAYING_PLAYLIST_OPEN,
} from '../actionTypes';

const initionState = {
  currentSong: {},
  playingPlaylist: [],
  volume: '0.5',
  playSong: false,
  playingPlaylistOpen: false,
};

export const playingSong = (state = initionState, action) => {
  switch (action.type) {
    case START_SONG:
      if (state.playingPlaylist === action.payload.data.playingPlaylist) {
        return {
          ...state,
          currentSong: action.payload.data.currentSong,
        };
      }
      return {
        ...state,
        playingPlaylist: action.payload.data.playingPlaylist,
        currentSong: action.payload.data.currentSong,
      };

    case CONTROL_SONG:
      return {
        ...state,
        playSong: !state.playSong,
      };
    case UPDATE_VOLUME:
      return {
        ...state,
        volume: action.payload.value,
      };
    case PLAYING_PLAYLIST_OPEN:
      return {
        ...state,
        playingPlaylistOpen: !state.playingPlaylistOpen,
      };
    default:
      return state;
  }
};
