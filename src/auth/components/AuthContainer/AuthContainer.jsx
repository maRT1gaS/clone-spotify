import React from 'react';
import PropTypes from 'prop-types';
import styles from './AuthContainer.module.css';

const AuthContainer = ({ children }) => (
  <div className={`${styles.container}`}>{children}</div>
);

AuthContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default AuthContainer;
