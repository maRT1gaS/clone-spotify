import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './Input.module.css';
import ClearIcon from '../../assets/svg/delete.svg';

export const Input = ({
  type,
  placeholder,
  preIcon,
  id,
  text,
  clearIcon,
  value,
  onChange,
  handleClear,
}) => {
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
        {text}
      </label>

      <input
        onChange={onChange}
        value={value}
        id={id}
        type={type}
        ref={inputRef}
        placeholder={placeholder}
        className={cn(styles.input, {
          [styles.onTab]: onTab,
          [styles.paddingRight]: clearIcon,
        })}
        onBlur={() => setOnTab(false)}
        onKeyUp={setOutline}
      />

      {clearIcon && Boolean(value.length) && (
        <div
          role='presentation'
          atia-label='Кнопка очистки поля'
          className={`${styles.inputIcon} ${styles.clearIcon}`}
          onClick={handleClear}
        >
          <ClearIcon />
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  preIcon: PropTypes.element,
  clearIcon: PropTypes.bool,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  handleClear: PropTypes.func,
};

Input.defaultProps = {
  preIcon: null,
  clearIcon: false,
  handleClear: null,
};
