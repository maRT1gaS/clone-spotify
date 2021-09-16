import React from 'react';
import LoaderIcon from '../../assets/svg/logo.svg';
import styles from './LoaderPage.module.css';

export const LoaderPage = () => (
  <div className={styles.loader}>
    <LoaderIcon />
  </div>
);
