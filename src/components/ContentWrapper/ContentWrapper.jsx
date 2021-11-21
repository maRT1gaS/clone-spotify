import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './ContentWrapper.module.css';

export const ContentWrapper = React.forwardRef(
  ({ children, isFocus, onBlur }, ref) => (
    <div
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex='0'
      ref={ref}
      className={cn(styles.contentWrapper, {
        isFocus,
      })}
      onBlur={onBlur}
    >
      {children}
    </div>
  )
);

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  isFocus: PropTypes.bool.isRequired,
  onBlur: PropTypes.func.isRequired,
};
