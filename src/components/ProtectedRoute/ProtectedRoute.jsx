import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ isAuth, path, component }) =>
  isAuth ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to='/login' />
  );

ProtectedRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.shape().isRequired,
};
