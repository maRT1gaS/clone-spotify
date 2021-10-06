import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import styles from './MusicItem.module.css';
import MusicNoteIcon from '../../../assets/svg/music-note.svg';
import PlayIcon from '../../../assets/svg/play.svg';
import { startSong } from '../../../redux/actions/playingSongAction';
import { SongLink } from '../../SongLink/SongLink';

export const MusicItem = ({ song, playingPlaylist }) => {
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();

  const { currentSong, playSong: isPlaySong } = useSelector(
    (state) => state.playingSong
  );

  const playSong = (songPlay, playlist) => {
    dispatch(startSong(songPlay, playlist));
  };
  return (
    <div
      role='presentation'
      onDoubleClick={() => playSong(song, playingPlaylist)}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className={`${styles.songItem} no-copy`}
    >
      <div className={styles.songItemContent}>
        {currentSong?.id && currentSong.id === song.id && isPlaySong ? (
          <Loader type='Audio' color='#28BF30' width={20} height={20} />
        ) : (
          <>
            {hover ? (
              <PlayIcon className={`${styles.songItemSVG} ${styles.hover}`} />
            ) : (
              <MusicNoteIcon
                className={`${styles.songItemSVG} ${styles.unHover}`}
              />
            )}
          </>
        )}
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
