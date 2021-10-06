import React from 'react';
import PropTypes from 'prop-types';
import styles from './Profile.module.css';

export class Profile extends React.Component {
  render() {
    const { imageUrl, name, since } = this.props;
    return (
      <div className={styles.profile}>
        <figure className={styles.figure}>
          <img className={styles.img} src={`/api${imageUrl}`} alt={name} />
          <figcaption className={styles.figcaption}>
            {name}
            {since && <span> &bull; {since}</span>}
          </figcaption>
        </figure>
      </div>
    );
  }
}

Profile.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  since: PropTypes.string,
};

Profile.defaultProps = {
  since: '',
};
