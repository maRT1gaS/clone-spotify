import React from 'react';
import PropTypes from 'prop-types';
import { MusicItem } from './MusicItem/MusicItem';
import { ContentTitle } from '../ContentTitle/ContentTitle';

export const MusicList = ({ music, name }) => (
  <div>
    <ContentTitle name={name} />
    {music.map((elem) => (
      <MusicItem
        key={elem.id}
        time={elem.duration}
        nameMusic={elem.name}
        imageUrl={elem.album.imageUrl}
        nameArtist={elem.artist.name}
        nameAlbum={elem.album.name}
      />
    ))}
  </div>
);

MusicList.propTypes = {
  name: PropTypes.string.isRequired,
  music: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
