import React from 'react';
import PropTypes from 'prop-types';
import { MusicItem } from '../MusicItem/MusicItem';
import styles from './PlayingSongsList.module.css';

export class PlayingSongsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlist: [],
    };
  }

  componentDidMount() {
    const { currentSong, playingPlaylist } = this.props;
    this.getNewPlaylist(playingPlaylist, currentSong);
  }

  componentDidUpdate(prevProps) {
    const { currentSong, playingPlaylist } = this.props;
    if (prevProps.currentSong.id !== currentSong.id) {
      this.getNewPlaylist(playingPlaylist, currentSong);
    }
  }

  getNewPlaylist = (songs, currentSong) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const newPlaylist = [
      ...songs.slice(currentIndex + 1),
      ...songs.slice(0, currentIndex),
    ];
    this.setState({ playlist: newPlaylist });
  };

  render() {
    const { playlist } = this.state;
    const { playingPlaylist, currentSong } = this.props;
    return (
      <>
        <h4 className={styles.subTitle}>Сейчас играет</h4>
        <MusicItem song={currentSong} playingPlaylist={playingPlaylist} />
        <h4 className={styles.subTitle}>Далее отсюда</h4>
        {playlist.map((song) => (
          <MusicItem
            key={song.id}
            song={song}
            playingPlaylist={playingPlaylist}
          />
        ))}
      </>
    );
  }
}

PlayingSongsList.propTypes = {
  currentSong: PropTypes.shape().isRequired,
  playingPlaylist: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
