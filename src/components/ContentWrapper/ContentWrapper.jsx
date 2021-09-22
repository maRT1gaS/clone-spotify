import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContentWrapper.module.css';

export const ContentWrapper = ({ children }) => (
  <div className={styles.contentWrapper}>{children}</div>
);

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
