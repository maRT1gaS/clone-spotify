import React from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
          <title>Сейчас играет</title>
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
  songs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  currentSong: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  songs: state.playingSong.playingPlaylist,
  currentSong: state.playingSong.currentSong,
});
export default connect(mapStateToProps)(PlayingPlaylist);
