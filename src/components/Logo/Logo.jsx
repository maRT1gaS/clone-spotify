import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Logo.module.css';
import LogoIcon from '../../assets/svg/logo.svg';

export const Logo = ({ path }) => {
  const location = useLocation();
  return (
    <>
      {['/', '/login', '/registration'].includes(location.pathname) ? (
        <div
          className={styles.logo}
          title='Spoty'
          style={{ cursor: 'default' }}
        >
          <LogoIcon />
          <h1 className={styles.logoName}>Spoty</h1>
        </div>
      ) : (
        <Link
          to={path}
          title='Spoty'
          className={`${styles.logo} ${styles.logoLink}`}
        >
          <LogoIcon />
          <h1 className={styles.logoName}>Spoty</h1>
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
