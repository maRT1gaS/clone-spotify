import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './Logo.module.css';
import LogoIcon from '../../assets/svg/logo.svg';

export const Logo = ({ path }) => {
  const location = useLocation();
  const [isFocus, setIsFocus] = useState(false);
  const setOutline = (key) => {
    if (key.code === 'Tab') {
      setIsFocus(true);
    }
  };
  return (
    <>
      {['/', '/login', '/registration'].includes(location.pathname) ? (
        <div
          className={styles.logo}
          title='Spoty'
          style={{ cursor: 'default' }}
        >
          <LogoIcon />
          <h1 className={`${styles.logoName} no-copy`}>Spoty</h1>
        </div>
      ) : (
        <Link
          onBlur={() => setIsFocus(false)}
          onKeyUp={setOutline}
          to={path}
          title='Spoty'
          className={cn(`${styles.logo} ${styles.logoLink}`, {
            isFocus,
          })}
        >
          <LogoIcon />
          <h1 className={`${styles.logoName} no-copy`}>Spoty</h1>
        </Link>
      )}
    </>
  );
};

Logo.propTypes = {
  path: PropTypes.string,
};

Logo.defaultProps = {
  path: '/',
};
