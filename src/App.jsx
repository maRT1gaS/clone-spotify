import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cookie from 'js-cookie';
import styles from './App.module.css';
import NotFound from './pages/NotFound/NotFound';
import ContentPage from './pages/ContentPage/ContentPage';
import { LoaderPage, Notification } from './components/index';
import Login from './auth/pages/Login/Login';
import Registration from './auth/pages/Registration/Registration';
import { successAuthAction } from './redux/actions/authAction';
import { resetNotification } from './redux/actions/notificationAction';

const App = ({
  setUserData,
  textNotification,
  typeNotification,
  notification,
  resetAlert,
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = Cookie.get('TOKEN');
    if (token) {
      const userData = JSON.parse(sessionStorage.getItem('userDara'));
      if (userData) {
        setUserData(userData);
      }
    }

    if (notification) {
      setTimeout(() => {
        resetAlert();
      }, 5000);
    }

    setLoading(false);
  }, [setUserData, notification, resetAlert]);
  return (
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
  );
};

App.propTypes = {
  setUserData: PropTypes.func.isRequired,
  notification: PropTypes.bool.isRequired,
  textNotification: PropTypes.string.isRequired,
  typeNotification: PropTypes.string.isRequired,
  resetAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth,
  notification: state.notificationReducer.notification,
  textNotification: state.notificationReducer.textNotification,
  typeNotification: state.notificationReducer.typeNotification,
});

const mapDispatchToProps = (dispatch) => ({
  setUserData: (data) => dispatch(successAuthAction(data)),
  resetAlert: () => dispatch(resetNotification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
