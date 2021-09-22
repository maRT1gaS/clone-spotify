import React from 'react';
import PropTypes from 'prop-types';
import styles from './MediaPlayer.module.css';

export const MediaPlayer = ({ children }) => (
  <div className={styles.playerWrapper}>{children}</div>
);

MediaPlayer.propTypes = {
  children: PropTypes.element.isRequired,
};
