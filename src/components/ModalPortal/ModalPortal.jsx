import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export const ModalPortal = ({ children }) =>
  ReactDOM.createPortal(
    <div>{children}</div>,
    document.getElementById('modal')
  );

ModalPortal.propTypes = {
  children: PropTypes.element.isRequired,
};
