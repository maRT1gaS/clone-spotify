import React from 'react';
// Loader -> Bars
import Bars from 'react-loader-spinner';
import styles from './Loader.module.css';

export const Loader = () => (
  <div className={styles.loader}>
    <Bars type='Bars' color='#28BF30' height={80} width={80} />
  </div>
);
