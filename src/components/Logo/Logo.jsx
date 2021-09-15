import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import styles from './Logo.module.css';
import LogoIcon from '../../assets/svg/logo.svg';

export const Logo = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname === '/' ? (
        <div className={styles.logo}>
          <LogoIcon />
          <h1 className={styles.logoName}>Spoty</h1>
        </div>
      ) : (
        <Link to='/' className={`${styles.logo} ${styles.logoLink}`}>
          <LogoIcon />
          <h1 className={styles.logoName}>Spoty</h1>
        </Link>
      )}
    </>
  );
};
