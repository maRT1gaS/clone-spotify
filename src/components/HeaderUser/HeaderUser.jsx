import React from 'react';
import PropTypes from 'prop-types';
import styles from './HeaderUser.module.css';
import UserIcon from '../../assets/svg/user.svg';

export const HeaderUser = ({ name }) => (
  <div className={styles.headerUser}>
    <UserIcon className={styles.userIcon} />
    <div className={styles.headerUserContent}>
      <h3 className={styles.headerUserName}>{name}</h3>
    </div>
  </div>
);

HeaderUser.propTypes = {
  name: PropTypes.string.isRequired,
};
