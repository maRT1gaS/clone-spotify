import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './CustomLink.module.css';

export const CustomLink = ({ children, path, size }) => {
  const [isFocus, setIsFocus] = useState(false);

  const setOutline = (key) => {
    if (key.code === 'Tab') {
      setIsFocus(true);
    }
  };
  return (
    <Link
      onBlur={() => setIsFocus(false)}
      onKeyUp={setOutline}
      className={cn(styles.link, {
        [styles.small]: size === 'sm',
        [styles.big]: size === 'bg',
        isFocus,
      })}
      to={path}
    >
      {children}
    </Link>
  );
};

CustomLink.propTypes = {
  size: PropTypes.oneOf(['sm', 'bg']),
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};

CustomLink.defaultProps = {
  size: 'sm',
};
