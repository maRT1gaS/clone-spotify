import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './MusicItem.module.css';
import MusicNoteIcon from '../../../assets/svg/music-note.svg';
import PlayIcon from '../../../assets/svg/play.svg';

export const MusicItem = ({
  time,
  imageUrl,
  nameMusic,
  nameArtist,
  nameAlbum,
}) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      role='presentation'
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className={`${styles.musicItem} no-copy`}
    >
      <div className={styles.musicItemContent}>
        {hover ? (
          <PlayIcon className={`${styles.musicItemSVG} ${styles.hover}`} />
        ) : (
          <MusicNoteIcon
            className={`${styles.musicItemSVG} ${styles.unHover}`}
          />
        )}
        <div className={styles.musicItemImgCon}>
          <img
            className={styles.musicItemImg}
            src={`/api${imageUrl}`}
            alt={nameAlbum}
          />
        </div>
        <div className={styles.musicItemInfo}>
          <h3 className={styles.musicItemName}>{nameMusic}</h3>
          <div className={styles.musicItemSecondInfo}>
            <span>{nameArtist}</span>
            &ensp;&bull;&ensp;
            <span>{nameAlbum}</span>
          </div>
        </div>
      </div>
      <div className={styles.musicItemTime}>
        <span>{moment().startOf('day').second(time).format('mm:ss')}</span>
      </div>
    </div>
  );
};

MusicItem.propTypes = {
  time: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  nameMusic: PropTypes.string.isRequired,
  nameArtist: PropTypes.string.isRequired,
  nameAlbum: PropTypes.string.isRequired,
};
