import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ReactDOM from 'react-dom';
import styles from './Notification.module.css';
import ErrorIcon from '../../assets/svg/error.svg';
import SuccessIcon from '../../assets/svg/checkmark.svg';

export const Notification = ({ name, type }) =>
  ReactDOM.createPortal(
    <div
      className={cn(styles.notificationContainer, {
        [styles.error]: type === 'error',
        [styles.success]: type === 'success',
      })}
    >
      <div className={styles.notificationSvg}>
        {type === 'error' ? <ErrorIcon /> : <SuccessIcon />}
      </div>
      <h2 className={styles.notificationText}>{name}</h2>
    </div>,
    document.getElementById('notification')
  );

Notification.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['error', 'success']).isRequired,
};
