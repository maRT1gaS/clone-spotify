import React from 'react';
import PropTypes from 'prop-types';
import styles from './Title.module.css';

export function Title({ name }) {
  return <h2 className={styles.title}>{name}</h2>;
}

Title.propTypes = {
  name: PropTypes.string.isRequired,
};
