import React from 'react';
import PropTypes from 'prop-types';
import styles from './AuthTitle.module.css';

const AuthTitle = ({ children }) => (
  <h2 className={styles.title}>{children}</h2>
);

AuthTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthTitle;
