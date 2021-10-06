import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  ContentWrapper,
  MusicList,
  Loader,
  Profile,
  ContentNotification,
} from '../../components/index';
import { loadingAction } from '../../redux/actions/loadingAction';
import { ALBUM } from '../../redux/actionTypes';

class Artist extends React.Component {
  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      loadingAlbum,
    } = this.props;
    loadingAlbum(`/albums/${id}`, ALBUM);
  }

  render() {
    const { isLoading, album } = this.props;
    return (
      <>
        <Helmet>
          <title>
            {album?.id ? `Альбом - ${album.name}` : 'Альбом не найден'}
          </title>
        </Helmet>
        <ContentWrapper>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {album?.id ? (
                <>
                  <Profile
                    type='album'
                    imageUrl={album.imageUrl}
                    name={album.name}
                    since={album.year}
                  />
                  <MusicList name='Песни' songs={album.songs} />
                </>
              ) : (
                <ContentNotification title='Данный альбом не найден' />
              )}
            </>
          )}
        </ContentWrapper>
      </>
    );
  }
}

Artist.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  match: PropTypes.shape().isRequired,
  album: PropTypes.shape().isRequired,
  loadingAlbum: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.loadingData.isLoading,
  album: state.loadingData.album,
});

const mapDispatchToProps = (dispatch) => ({
  loadingAlbum: (url, type) => dispatch(loadingAction(url, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Artist);
