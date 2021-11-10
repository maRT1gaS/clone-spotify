import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Cookie from 'js-cookie';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { Logo } from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import styles from './VerticalNav.module.css';
import { navItems } from '../../helpers/navItems';
import LogOutIcon from '../../assets/svg/log-out.svg';
import { logOutAction } from '../../redux/actions/authAction';
import { successNotification } from '../../redux/actions/notificationAction';

export const VerticalNav = ({ onKeyDown, setVisible, visible }) => {
  const [isFocus, setIsFocus] = useState(false);

  const setOutline = (key) => {
    if (key.code === 'Tab') {
      setIsFocus(true);
    }
  };

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const logOut = () => {
    Cookie.remove('TOKEN');
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('lastPlayingSong');
    dispatch(logOutAction());
    dispatch(successNotification('Вы успешно вышли.'));
    history.push('/login');
  };

  return (
    <div className={styles.navWrapper}>
      {!(location.pathname === '/search') && (
        <a
          className={cn(styles.skipNav, {
            [styles.visible]: visible,
            isFocus: visible,
          })}
          onFocus={() => setVisible(true)}
          onBlur={() => setVisible(false)}
          onKeyDown={onKeyDown}
          tabIndex='0'
          href='true'
        >
          Перейти к песням
        </a>
      )}
      <div className={styles.navContent}>
        <Logo />
        <Navigation points={navItems} />
      </div>
      <div className={styles.logOutCon}>
        <button
          onBlur={() => setIsFocus(false)}
          onKeyUp={setOutline}
          tabIndex='0'
          type='button'
          onClick={logOut}
          className={cn(styles.logOut, {
            isFocus,
          })}
        >
          <LogOutIcon />
          Выйти
        </button>
      </div>
    </div>
  );
};

VerticalNav.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
  setVisible: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};
