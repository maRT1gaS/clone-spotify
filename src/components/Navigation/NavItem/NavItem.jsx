import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './NavItem.module.css';

const NavItem = ({ path, name, icon }) => {
  const [isFocus, setIsFocus] = useState(false);
  const navLinkRef = useRef();

  const setOutline = (key) => {
    if (key.code === 'Tab') setIsFocus(true);
  };

  return (
    <li className={styles.navItem}>
      <NavLink
        ref={navLinkRef}
        onBlur={() => setIsFocus(false)}
        onKeyUp={setOutline}
        to={path}
        exact
        className={cn(styles.navLink, {
          isFocus,
        })}
        activeClassName={styles.navLinkActive}
      >
        {icon}
        <p className={styles.navLinkTitle}>{name}</p>
      </NavLink>
    </li>
  );
};

NavItem.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default NavItem;
