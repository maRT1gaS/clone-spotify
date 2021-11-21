import React from 'react';
import PropTypes from 'prop-types';
import { CardItem } from './CardItem/CardItem';
import styles from './CardList.module.css';
import { ContentTitle } from '../ContentTitle/ContentTitle';

export function CardsList({ type, data, name }) {
  return (
    <div>
      <ContentTitle name={name} />
      <div className={styles.container}>
        {data.map((elem) => (
          <CardItem
            key={elem.id}
            type={type}
            imageUrl={elem.imageUrl}
            name={elem.name}
            id={elem.id}
          />
        ))}
      </div>
    </div>
  );
}

CardsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  type: PropTypes.oneOf(['artist', 'album']).isRequired,
  name: PropTypes.string.isRequired,
};
