import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import styles from './SoundControl.module.css';
import NoSoundIcon from '../../../assets/svg/no-sound.svg';
import PlayingPlaylistIcon from '../../../assets/svg/playlist.svg';
import SoundIcon from '../../../assets/svg/sound.svg';
import { updateVolume } from '../../../redux/actions/playingSongAction';

function SoundControl({ changeVolume, volState, setVolState }) {
  const dispatch = useDispatch();
  const [oldVolume, setOldVolume] = useState('');
  const [prevPathname, setPrevPathname] = useState('');
  const location = useLocation();

  const handleVolume = () => {
    dispatch(updateVolume(volState));
  };

  const savePrevPathname = () => {
    if (location.pathname !== '/playingplaylist') {
      setPrevPathname(location.pathname);
    }
  };
  const handleChangeVolume = () => {
    if (oldVolume) {
      dispatch(updateVolume(oldVolume));
      setVolState(oldVolume);
      changeVolume(oldVolume);
      setOldVolume('');
    } else {
      setVolState('0');
      setOldVolume(volState);
      dispatch(updateVolume('0'));
      changeVolume('0');
    }
  };
  return (
    <div className={styles.otherControls}>
      <Link
        className={styles.playingPlaylistSvgCon}
        onClick={savePrevPathname}
        to={
          location.pathname === '/playingplaylist'
            ? prevPathname
            : {
                pathname: '/playingplaylist',
                state: { from: location.pathname },
              }
        }
      >
        <PlayingPlaylistIcon
          className={cn(styles.playingPlaylistSvg, {
            [styles.active]: location.pathname === '/playingplaylist',
            [styles.nonActive]: location.pathname !== '/playingplaylist',
          })}
        />
      </Link>
      <div className={styles.soundController}>
        <button
          type='button'
          onClick={() => handleChangeVolume()}
          className={styles.soundIcon}
        >
          {volState === '0' ? <NoSoundIcon /> : <SoundIcon />}
        </button>
        <input
          className={styles.range}
          type='range'
          min='0'
          max='1'
          step='0.05'
          onMouseUp={() => handleVolume()}
          value={volState}
          onChange={(event) => changeVolume(event.target.value)}
        />
      </div>
    </div>
  );
}

SoundControl.propTypes = {
  changeVolume: PropTypes.func.isRequired,
  volState: PropTypes.string.isRequired,
  setVolState: PropTypes.func.isRequired,
};

export default SoundControl;
