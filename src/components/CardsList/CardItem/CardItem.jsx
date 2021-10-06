import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import styles from './CardItem.module.css';

export function CardItem({ name, imageUrl, type, id }) {
  return (
    <Link to={`/${type === 'artist' ? 'artist' : 'album'}/${id}`}>
      <div className={`${styles.container} no-copy`}>
        <figure className={styles.figure}>
          <img
            className={cn(styles.img, {
              [styles.artistBr]: type === 'artist',
              [styles.albumBr]: type === 'album',
            })}
            src={`/api${imageUrl}`}
            alt={name}
          />
          <figcaption className={styles.title}>{name}</figcaption>
        </figure>
      </div>
    </Link>
  );
}

CardItem.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['artist', 'album']).isRequired,
  id: PropTypes.string.isRequired,
};
