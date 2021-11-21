import {
  startSong,
  controlSong,
  toggleRepeat,
  updateVolume,
} from '../playingSongAction';
import {
  START_SONG,
  CONTROL_SONG,
  UPDATE_VOLUME,
  REPEAT_TOGGLE,
} from '../../actionTypes';

describe('Testing action playingSong', () => {
  it('actionCreater - startSong', () => {
    const playingPlaylist = [
      {
        favorite: true,
        name: 'The Attack of the Dead Men',
        url: '/files/songs/5ed674cba35a6c1af80e9213.mp3',
        duration: 235,
        listens: 18,
        id: '5ed674cba35a6c1af80e9213',
      },
      {
        favorite: false,
        name: 'I Bet My Life',
        url: '/files/songs/5ed3a36e4a7a3840808789bb.mp3',
        duration: 196,
        listens: 12,
        id: '5ed3a36e4a7a3840808789bb',
      },
      {
        favorite: true,
        name: 'Radioactive',
        url: '/files/songs/5ed29fbd78d83123986ffdd4.mp3',
        duration: 187,
        listens: 21,
        id: '5ed29fbd78d83123986ffdd4',
      },
      {
        favorite: false,
        name: "It's Time",
        url: '/files/songs/5ed2a01278d83123986ffdd5.mp3',
        duration: 240,
        listens: 37,
        id: '5ed2a01278d83123986ffdd5',
      },
    ];
    const currentSong = {
      favorite: true,
      name: 'The Attack of the Dead Men',
      url: '/files/songs/5ed674cba35a6c1af80e9213.mp3',
      duration: 235,
      listens: 18,
      id: '5ed674cba35a6c1af80e9213',
    };
    const event = 'click';

    const start = startSong(currentSong, playingPlaylist, event);
    expect(start).toEqual({
      type: START_SONG,
      payload: {
        data: {
          currentSong,
          playingPlaylist,
        },
        event,
      },
    });
  });

  it('actionCreater - controlSong', () => {
    const control = controlSong();
    expect(control).toEqual({
      type: CONTROL_SONG,
    });
  });

  it('actionCreater - updateVolume', () => {
    const volumeValue = '0.8';
    const volume = updateVolume(volumeValue);
    expect(volume).toEqual({
      type: UPDATE_VOLUME,
      payload: {
        value: volumeValue,
      },
    });
  });

  it('actionCreater - toggleRepeat', () => {
    const toggle = toggleRepeat();
    expect(toggle).toEqual({ type: REPEAT_TOGGLE });
  });
});
