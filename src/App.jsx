import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cookie from 'js-cookie';
import { Helmet } from 'react-helmet-async';
import styles from './App.module.css';
import { LoaderPage, Notification } from './components/index';
import { successAuthAction } from './redux/actions/authAction';
import { resetNotification } from './redux/actions/notificationAction';
import { updateVolume, startSong } from './redux/actions/playingSongAction';
import RootAppRouting from './router/RootAppRouting';

const App = ({
  setUserData,
  textNotification,
  typeNotification,
  notification,
  resetAlert,
  changeVolume,
  playingSong,
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        resetAlert();
      }, 2500);
    }
  }, [notification, resetAlert]);

  useEffect(() => {
    const token = Cookie.get('TOKEN');
    if (token) {
      setUserData(token);
      const settings = JSON.parse(localStorage.getItem('settings'));
      if (settings) {
        changeVolume(settings.volume);
      }
      const lastPlayingSong = JSON.parse(
        sessionStorage.getItem('lastPlayingSong')
      );
      if (lastPlayingSong) {
        const { currentSong, playingPlaylist } = lastPlayingSong;
        playingSong(currentSong, playingPlaylist, 'auto');
      }
    }
    setLoading(false);
  }, [setUserData, changeVolume, playingSong]);
  return (
    <>
      <Helmet>
        <title>j</title>
      </Helmet>
      <div className={`${styles.wrapper} fullscreen`}>
        {loading ? (
          <LoaderPage />
        ) : (
          <>
            {notification && (
              <Notification name={textNotification} type={typeNotification} />
            )}
            <RootAppRouting />
          </>
        )}
      </div>
    </>
  );
};

App.propTypes = {
  setUserData: PropTypes.func.isRequired,
  notification: PropTypes.bool.isRequired,
  textNotification: PropTypes.string.isRequired,
  typeNotification: PropTypes.string.isRequired,
  resetAlert: PropTypes.func.isRequired,
  changeVolume: PropTypes.func.isRequired,
  playingSong: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.authorization.isAuth,
  notification: state.notification.notification,
  textNotification: state.notification.textNotification,
  typeNotification: state.notification.typeNotification,
});

const mapDispatchToProps = (dispatch) => ({
  setUserData: (token) => dispatch(successAuthAction(token)),
  resetAlert: () => dispatch(resetNotification()),
  changeVolume: (value) => dispatch(updateVolume(value)),
  playingSong: (currentSong, playingPlaylist, event) =>
    dispatch(startSong(currentSong, playingPlaylist, event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
