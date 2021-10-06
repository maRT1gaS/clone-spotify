import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './SongLink.module.css';

export class SongLink extends React.Component {
  render() {
    const { path, children } = this.props;
    return (
      <Link className={styles.link} to={path}>
        {children}
      </Link>
    );
  }
}

SongLink.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};
