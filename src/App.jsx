import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cookie from 'js-cookie';
import { Helmet } from 'react-helmet-async';
import styles from './App.module.css';
import NotFound from './pages/NotFound/NotFound';
import ContentPage from './pages/ContentPage/ContentPage';
import { LoaderPage, Notification } from './components/index';
import Login from './auth/pages/Login/Login';
import Registration from './auth/pages/Registration/Registration';
import { successAuthAction } from './redux/actions/authAction';
import { resetNotification } from './redux/actions/notificationAction';
import { updateVolume, startSong } from './redux/actions/playingSongAction';

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
    const token = Cookie.get('TOKEN');
    if (token) {
      const userData = JSON.parse(sessionStorage.getItem('userData'));
      if (userData) {
        setUserData(userData);
      }
      const settings = JSON.parse(localStorage.getItem('settings'));
      if (settings) {
        changeVolume(settings.volume);
      }
      const lastPlayingSong = JSON.parse(
        sessionStorage.getItem('lastPlayingSong')
      );
      if (lastPlayingSong) {
        const { currentSong, playingPlaylist } = lastPlayingSong;
        playingSong(currentSong, playingPlaylist);
      }
    }

    if (notification) {
      setTimeout(() => {
        resetAlert();
      }, 5000);
    }

    setLoading(false);
  }, [setUserData, notification, resetAlert, changeVolume, playingSong]);
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
            <Switch>
              <Route exact path='/404' component={NotFound} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/registration' component={Registration} />
              <Route path='/' component={ContentPage} />
            </Switch>
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
  setUserData: (data) => dispatch(successAuthAction(data)),
  resetAlert: () => dispatch(resetNotification()),
  changeVolume: (value) => dispatch(updateVolume(value)),
  playingSong: (currentSong, playingPlaylist) =>
    dispatch(startSong(currentSong, playingPlaylist)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
