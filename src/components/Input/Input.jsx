import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.css';

export const Input = ({ type }) => (
  <input type={type} className={styles.input} />
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
};
