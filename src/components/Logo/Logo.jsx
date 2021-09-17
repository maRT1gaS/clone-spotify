import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import styles from './Logo.module.css';
import LogoIcon from '../../assets/svg/logo.svg';

export const Logo = () => {
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
          to='/'
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
