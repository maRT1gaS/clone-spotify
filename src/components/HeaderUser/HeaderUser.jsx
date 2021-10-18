import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styles from './HeaderUser.module.css';
import UserIcon from '../../assets/svg/user.svg';
import { openModal } from '../../redux/actions/uiStateAction';

export const HeaderUser = ({ name, role }) => {
  const dispatch = useDispatch();

  switch (role) {
    case 'admin':
      return (
        <div
          onClick={() => dispatch(openModal('headerUser'))}
          role='presentation'
          className={`${styles.headerUser} ${styles.btn} no-copy`}
        >
          <UserIcon className={styles.userIcon} />
          <div className={styles.headerUserContent}>
            <h3 className={styles.headerUserName}>{name}</h3>
          </div>
        </div>
      );
    case 'user':
      return (
        <div className={styles.headerUser}>
          <UserIcon className={styles.userIcon} />
          <div className={styles.headerUserContent}>
            <h3 className={styles.headerUserName}>{name}</h3>
          </div>
        </div>
      );
    default:
      return false;
  }
};

HeaderUser.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};
