import React from 'react';
import PropTypes from 'prop-types';
import styles from './HeaderUserModal.module.css';

export const HeaderUserModal = ({ title, href }) => (
  <div className={styles.conModal}>
    <div className={styles.conModalContent}>
      <a
        target='_blank'
        className={styles.title}
        rel='noopener noreferrer'
        href={href}
      >
        {title}
      </a>
    </div>
  </div>
);

HeaderUserModal.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
