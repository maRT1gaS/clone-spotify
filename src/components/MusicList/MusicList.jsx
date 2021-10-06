import React from 'react';
import PropTypes from 'prop-types';
import { MusicItem } from './MusicItem/MusicItem';
import { ContentTitle } from '../ContentTitle/ContentTitle';

export const MusicList = ({ songs, name }) => (
  <div>
    <ContentTitle name={name} />
    {songs.map((song) => (
      <MusicItem key={song.id} song={song} playingPlaylist={songs} />
    ))}
  </div>
);

MusicList.propTypes = {
  name: PropTypes.string.isRequired,
  songs: PropTypes.arrayOf(PropTypes.object).isRequired,
};
