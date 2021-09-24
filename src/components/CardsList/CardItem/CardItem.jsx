import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './CardItem.module.css';

export function CardItem({ name, imageUrl, type }) {
  return (
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
  );
}

CardItem.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
