import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './CustomLink.module.css';

export const CustomLink = ({ children, path, size }) => (
  <Link
    className={cn(styles.link, {
      [styles.small]: size === 'sm',
      [styles.big]: size === 'bg',
    })}
    to={path}
  >
    {children}
  </Link>
);

CustomLink.propTypes = {
  size: PropTypes.oneOf(['sm', 'bg']),
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};

CustomLink.defaultProps = {
  size: 'sm',
};
