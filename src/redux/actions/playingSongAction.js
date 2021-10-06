import { START_SONG, CONTROL_SONG, UPDATE_VOLUME } from '../actionTypes';

export const startSong = (currentSong, playingPlaylist) => {
  const data = {
    currentSong,
    playingPlaylist,
  };
  sessionStorage.setItem('lastPlayingSong', JSON.stringify(data));
  return {
    type: START_SONG,
    payload: {
      data,
    },
  };
};

export const controlSong = () => ({
  type: CONTROL_SONG,
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
