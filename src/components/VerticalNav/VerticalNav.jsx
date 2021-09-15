import React from 'react';
import { Logo } from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import styles from './VerticalNav.module.css';
import { navItems } from '../../helpers/navItems';

export const VerticalNav = () => (
  <div className={styles.navWrapper}>
    <div className={styles.navContent}>
      <Logo />
      <Navigation points={navItems} />
    </div>
  </div>
);
