import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ReactDOM from 'react-dom';
import styles from './Notification.module.css';

export const Notification = ({ name, type }) =>
  ReactDOM.createPortal(
    <div
      className={cn(styles.notificationContainer, {
        [styles.error]: type === 'error',
        [styles.success]: type === 'success',
      })}
    >
      <h2 className={styles.notificationText}>{name}</h2>
    </div>,
    document.getElementById('notification')
  );

Notification.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
