import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from './InfoContent.module.css';
import HeartIcon from '../../../assets/svg/heart.svg';
import { SongLink } from '../../index';

const InfoContent = ({ currentSong }) => {
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    if (currentSong?.id) {
      axios.get('/api/library').then((res) => {
        const librarySongs = res.data.library;
        const songLike = librarySongs.some(
          (song) => song.id === currentSong.id
        );
        setIsLike(songLike);
      });
    }
  }, [currentSong.id, setIsLike]);

  const toogleLibrarySongStatus = () => {
    const axiosRes = async (method, idSong) => {
      axios({
        method,
        url: '/api/library',
        data: { id: idSong },
      });
    };
    if (isLike) {
      axiosRes('delete', currentSong.id);
      setIsLike(false);
    } else {
      axiosRes('post', currentSong.id);
      setIsLike(true);
    }
  };
  return (
    <div className={styles.infoContent}>
      {currentSong?.id ? (
        <>
          <img
            className={styles.infoContentImg}
            src={`/api${currentSong.album.imageUrl}`}
            alt={currentSong.album.name}
          />
          <div className={styles.infoContentText}>
            <h3 className={styles.infoContentSong}>{currentSong.name}</h3>
            <span className={styles.infoContentAuthor}>
              <SongLink path={`/artist/${currentSong.artist.id}`}>
                {currentSong.artist.name}
              </SongLink>
            </span>
          </div>
          <div
            role='presentation'
            onClick={toogleLibrarySongStatus}
            className={styles.infoContentSvg}
          >
            {isLike ? (
              <HeartIcon className={styles.like} />
            ) : (
              <HeartIcon className={styles.noLike} />
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

InfoContent.propTypes = {
  currentSong: PropTypes.shape().isRequired,
};

export default InfoContent;
