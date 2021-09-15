import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './NavItem.module.css';

const NavItem = ({ path, name, icon }) => (
  <li className={styles.navItem}>
    <NavLink
      to={path}
      exact
      className={styles.navLink}
      activeClassName={styles.navLinkActive}
    >
      {icon}
      <p className={styles.navLinkTitle}>{name}</p>
    </NavLink>
  </li>
);

NavItem.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default NavItem;
