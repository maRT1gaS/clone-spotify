import React from 'react';
import PropTypes from 'prop-types';
import styles from './Form.module.css';

export const Form = ({ children, legend, onSubmit, role }) => (
  <form role={role} onSubmit={onSubmit}>
    <fieldset className={styles.fieldset}>
      <legend className='visually-hidden'>{legend}</legend>
      {children}
    </fieldset>
  </form>
);

Form.propTypes = {
  children: PropTypes.element.isRequired,
  legend: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  role: PropTypes.oneOf(['search', 'form']).isRequired,
};

Form.defaultProps = {
  onSubmit: null,
};
