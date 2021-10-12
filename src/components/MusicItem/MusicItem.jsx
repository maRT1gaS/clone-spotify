import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import cn from 'classnames';
import styles from './MusicItem.module.css';
import MusicNoteIcon from '../../assets/svg/music-note.svg';
import PlayIcon from '../../assets/svg/play.svg';
import { startSong, controlSong } from '../../redux/actions/playingSongAction';
import { SongLink } from '../SongLink/SongLink';

export const MusicItem = ({ song, playingPlaylist }) => {
  const [hover, setHover] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();

  const { currentSong, isPlayingSong } = useSelector(
    (state) => state.playingSong
  );

  const playSong = (songPlay, playlist) => {
    if (songPlay.id === currentSong.id) {
      dispatch(controlSong());
      return;
    }
    dispatch(startSong(songPlay, playlist, 'click'));
  };

  const onSong = (key) => {
    key.preventDefault();
    if (key.code === 'Enter' || key.code === 'Space') {
      playSong(song, playingPlaylist);
    }
  };

  const setOutline = (key) => {
    if (key.code === 'Tab') {
      setIsFocus(true);
    }
  };
  return (
    <div
      onKeyUp={setOutline}
      onKeyPress={onSong}
      tabIndex='0'
      role='button'
      onDoubleClick={() => playSong(song, playingPlaylist)}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onBlur={() => setIsFocus(false)}
      className={cn(`${styles.songItem} no-copy`, {
        isFocus,
        [styles.selectedSong]: currentSong?.id === song.id,
      })}
    >
      <div className={styles.songItemContent}>
        <>
          {currentSong?.id === song.id ? (
            <>
              {currentSong?.id === song.id && isPlayingSong ? (
                <Loader type='Audio' color='#28BF30' width={20} height={20} />
              ) : (
                <MusicNoteIcon
                  className={`${styles.songItemSVG} ${styles.selectedSongSvg}`}
                />
              )}
            </>
          ) : (
            <>
              {hover ? (
                <PlayIcon
                  onClick={() => playSong(song, playingPlaylist)}
                  className={`${styles.songItemSVG} ${styles.hover}`}
                />
              ) : (
                <MusicNoteIcon
                  className={`${styles.songItemSVG} ${styles.unHover}`}
                />
              )}
            </>
          )}
        </>

        <div className={styles.songItemImgCon}>
          <img
            className={styles.songItemImg}
            src={`/api${song.album.imageUrl}`}
            alt={song.album.name}
          />
        </div>
        <div className={styles.songItemInfo}>
          <h3 className={styles.songItemName}>{song.name}</h3>
          <div className={styles.songItemSecondInfo}>
            <SongLink path={`/artist/${song.artist.id}`}>
              {song.artist.name}
            </SongLink>
            &ensp;&bull;&ensp;
            <SongLink path={`/album/${song.album.id}`}>
              {song.album.name}
            </SongLink>
          </div>
        </div>
      </div>
      <div className={styles.songItemTime}>
        <span>{moment().minute(0).second(song.duration).format('mm:ss')}</span>
      </div>
    </div>
  );
};

MusicItem.propTypes = {
  song: PropTypes.shape().isRequired,
  playingPlaylist: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
