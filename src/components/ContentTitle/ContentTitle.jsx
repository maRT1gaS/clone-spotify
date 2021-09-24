import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContentTitle.module.css';

export function ContentTitle({ name }) {
  return <h2 className={styles.title}>{name}</h2>;
}

ContentTitle.propTypes = {
  name: PropTypes.string.isRequired,
};
