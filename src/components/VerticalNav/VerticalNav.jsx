import React from 'react';
import PropTypes from 'prop-types';
import { Logo } from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import styles from './VerticalNav.module.css';
import { navItems } from '../../helpers/navItems';

export const VerticalNav = ({ style }) => (
  <div className={styles.navWrapper} style={style}>
    <div className={styles.navContent}>
      <Logo />
      <Navigation points={navItems} />
    </div>
  </div>
);

VerticalNav.propTypes = {
  style: PropTypes.shape(),
};

VerticalNav.defaultProps = {
  style: null,
};
