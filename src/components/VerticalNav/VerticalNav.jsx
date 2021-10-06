import React from 'react';
import PropTypes from 'prop-types';
import Cookie from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Logo } from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import styles from './VerticalNav.module.css';
import { navItems } from '../../helpers/navItems';
import LogOutIcon from '../../assets/svg/log-out.svg';
import { logOutAction } from '../../redux/actions/authAction';
import { successExit } from '../../redux/actions/notificationAction';

export const VerticalNav = ({ style }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const logOut = () => {
    Cookie.remove('TOKEN');
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('lastPlayingSong');
    dispatch(logOutAction());
    dispatch(successExit());
    history.push('/login');
  };
  return (
    <div className={styles.navWrapper} style={style}>
      <div className={styles.navContent}>
        <Logo />
        <Navigation points={navItems} />
      </div>
      <div className={styles.logOutCon}>
        <button type='button' onClick={logOut} className={styles.logOut}>
          <LogOutIcon />
          Выйти
        </button>
      </div>
    </div>
  );
};

VerticalNav.propTypes = {
  style: PropTypes.shape(),
};

VerticalNav.defaultProps = {
  style: null,
};
