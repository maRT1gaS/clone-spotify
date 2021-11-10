import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { errorNotification } from '../../redux/actions/notificationAction';

export const ProtectedRoute = ({ isAuth, path, component, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuth) {
      dispatch(errorNotification('Для просмотра контента авторизуйтесь.'));
    }
  }, [dispatch, isAuth]);

  return isAuth ? (
    <Route path={path} component={component}>
      {children}
    </Route>
  ) : (
    <Redirect to='/login' />
  );
};

ProtectedRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([PropTypes.shape(), PropTypes.func]),
  children: PropTypes.element,
};

ProtectedRoute.defaultProps = {
  children: null,
  component: null,
};
