import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './Input.module.css';

export const Input = ({ type, placeholder, icon }) => {
  const inputRef = useRef();
  const [onTab, setOnTab] = useState(false);

  const focusOnInput = () => {
    inputRef.current.focus();
  };

  const setOutline = (key) => {
    if (key.code === 'Tab') {
      setOnTab(true);
    }
  };

  return (
    <div className={styles.inputCon}>
      <div
        role='presentation'
        className={styles.inputIcon}
        onClick={() => focusOnInput()}
      >
        {icon}
      </div>
      <input
        type={type}
        ref={inputRef}
        placeholder={placeholder}
        className={cn(styles.input, {
          [styles.onTab]: onTab,
        })}
        onBlur={() => setOnTab(false)}
        onKeyUp={setOutline}
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.element,
};

Input.defaultProps = {
  icon: null,
};
