import React from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TSong } from '../../types/Song.type';
import {
  ContentTitle,
  PlayingSongsList,
  ContentNotification,
} from '../../components/index';

class PlayingPlaylist extends React.Component {
  render() {
    const { currentSong, songs } = this.props;
    return (
      <>
        <Helmet>
          <title>
            {currentSong?.id
              ? `Сейчас играет ${currentSong.artist.name} - ${currentSong.name}`
              : 'На данный моменнт в очереди ничего нет'}{' '}
          </title>
        </Helmet>
        <>
          <ContentTitle name='Очередь' />
          {currentSong?.id && songs.length > 0 ? (
            <PlayingSongsList
              currentSong={currentSong}
              playingPlaylist={songs}
            />
          ) : (
            <ContentNotification title='На данный моменнт в очереди ничего нет' />
          )}
        </>
      </>
    );
  }
}

PlayingPlaylist.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.shape(TSong)).isRequired,
  currentSong: PropTypes.shape(TSong).isRequired,
};

const mapStateToProps = (state) => ({
  songs: state.playingSong.playingPlaylist,
  currentSong: state.playingSong.currentSong,
});
export default connect(mapStateToProps)(PlayingPlaylist);
