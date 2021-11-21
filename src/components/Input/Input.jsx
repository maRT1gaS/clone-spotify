import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './Input.module.css';

export const Input = ({
  type,
  placeholder,
  preIcon,
  id,
  label,
  clearIcon,
  value,
  onChange,
  onClick,
  autoComplete,
  secondIcon,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
}) => {
  const inputRef = useRef();
  const [isFocus, setIsFocus] = useState(false);

  const focusOnInput = () => {
    inputRef.current.focus();
  };

  const setOutline = (key) => {
    if (key.code === 'Tab') {
      setIsFocus(true);
    }
  };

  return (
    <div className={styles.inputCon}>
      {preIcon && (
        <div
          role='presentation'
          className={`${styles.inputIcon} ${styles.preIcon}`}
          onClick={() => focusOnInput()}
        >
          {preIcon}
        </div>
      )}

      <label className='visually-hidden' htmlFor={id}>
        {label}
      </label>

      <input
        autoComplete={autoComplete}
        onChange={onChange}
        value={value}
        id={id}
        type={type}
        ref={inputRef}
        placeholder={placeholder}
        className={cn(styles.input, {
          isFocus,
          [styles.paddingRight]: clearIcon,
        })}
        onBlur={() => setIsFocus(false)}
        onKeyUp={setOutline}
      />

      {secondIcon && (
        <div
          role='presentation'
          className={`${styles.inputIcon} ${styles.clearIcon} no-copy`}
          onClick={onClick}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
        >
          {secondIcon}
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'password', 'email', 'search']),
  placeholder: PropTypes.string.isRequired,
  preIcon: PropTypes.element,
  clearIcon: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  autoComplete: PropTypes.oneOf(['on', 'off']),
  secondIcon: PropTypes.element,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
  preIcon: null,
  clearIcon: false,
  onClick: null,
  autoComplete: 'on',
  value: null,
  onChange: null,
  secondIcon: null,
  onMouseDown: null,
  onMouseUp: null,
  onMouseLeave: null,
};
