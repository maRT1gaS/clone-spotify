import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import styles from './InfoContent.module.css';
import HeartIcon from '../../../assets/svg/heart.svg';
import { SongLink } from '../../index';
import { loadingAction } from '../../../redux/actions/loadingAction';
import { LIBRARY } from '../../../redux/actionTypes';

const InfoContent = ({ currentSong }) => {
  const [isLike, setIsLike] = useState(false);
  const dispatch = useDispatch();
  const librarySongs = useSelector((state) => state.loadingData.library);

  useEffect(() => {
    if (currentSong?.id) {
      const songLike = librarySongs.some((song) => song.id === currentSong.id);
      setIsLike(songLike);
    }
  }, [currentSong.id, librarySongs, setIsLike]);

  useEffect(() => {
    if (librarySongs.length === 0) {
      dispatch(loadingAction('/library', LIBRARY));
    }
  }, [dispatch, librarySongs.length]);

  const toogleLibrarySongStatus = () => {
    const axiosRes = async (method, idSong) => {
      axios({
        method,
        url: '/api/library',
        data: { id: idSong },
      }).then(() => {
        dispatch(loadingAction('/library', LIBRARY, false));
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
