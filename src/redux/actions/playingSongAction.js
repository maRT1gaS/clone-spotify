import {
  START_SONG,
  CONTROL_SONG,
  UPDATE_VOLUME,
  REPEAT_TOGGLE,
} from '../actionTypes';

export const startSong = (currentSong, playingPlaylist, event) => {
  const data = {
    currentSong,
    playingPlaylist,
  };
  sessionStorage.setItem('lastPlayingSong', JSON.stringify(data));
  return {
    type: START_SONG,
    payload: {
      data,
      event,
    },
  };
};

export const controlSong = () => ({
  type: CONTROL_SONG,
});

export const toggleRepeat = () => ({
  type: REPEAT_TOGGLE,
});

export const updateVolume = (value) => {
  const data = {
    volume: value,
  };
  const settingVolume = JSON.stringify(data);
  localStorage.setItem('settings', settingVolume);
  return {
    type: UPDATE_VOLUME,
    payload: {
      value,
    },
  };
};
