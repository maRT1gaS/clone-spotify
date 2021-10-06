import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContentError.module.css';
import ErrorIcon from '../../assets/svg/error.svg';

export function ContentError({ title }) {
  return (
    <div className={styles.error}>
      <div className={styles.errorContent}>
        <div className={styles.errorSvg}>
          <ErrorIcon />
        </div>
        <p className={styles.errorTitle}>{title}</p>
      </div>
    </div>
  );
}

ContentError.propTypes = {
  title: PropTypes.string.isRequired,
};
