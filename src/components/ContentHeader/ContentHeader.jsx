import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContentHeader.module.css';

export const ContentHeader = ({ children }) => (
  <div className={styles.contentHeader}>
    <header className={styles.header}>{children}</header>
  </div>
);

ContentHeader.propTypes = {
  children: PropTypes.node.isRequired,
};
