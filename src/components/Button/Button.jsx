import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './Button.module.css';

export const Button = ({ children, type, onClick }) => {
  const [isFocus, setIsFocus] = useState(false);

  const setOutline = (key) => {
    if (key.code === 'Tab') {
      setIsFocus(true);
    }
  };
  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      className={cn(styles.button, {
        [styles.isFocus]: isFocus,
      })}
      onBlur={() => setIsFocus(false)}
      onKeyUp={setOutline}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['submit', 'button']),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  onClick: null,
};
