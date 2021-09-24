import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContentNotification.module.css';

export function ContentNotification({ title }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}

ContentNotification.propTypes = {
  title: PropTypes.string.isRequired,
};
