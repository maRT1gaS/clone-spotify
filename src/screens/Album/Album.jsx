import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  MusicList,
  Loader,
  Profile,
  ContentNotification,
} from '../../components/index';
import { loadingAction } from '../../redux/actions/loadingAction';
import { ALBUM } from '../../redux/actionTypes';
import { TSong } from '../../types/Song.type';

const Artist = ({ album, isLoading, loadingAlbum }) => {
  const { id } = useParams();
  useEffect(() => {
    if (!album?.id || album.id === id) {
      loadingAlbum(`/albums/${id}`, ALBUM);
    }
  }, [album.id, id, loadingAlbum]);
  return (
    <>
      <Helmet>
        <title>
          {album?.id ? `Альбом - ${album.name}` : 'Альбом не найден'}
        </title>
      </Helmet>
      <>
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
      </>
    </>
  );
};

Artist.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  album: PropTypes.shape({
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    year: PropTypes.string,
    songs: PropTypes.arrayOf(PropTypes.shape(TSong)),
  }).isRequired,
  loadingAlbum: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.loadingData.isLoading,
  album: state.loadingData.album,
});

const mapDispatchToProps = {
  loadingAlbum: (url, type) => loadingAction(url, type),
};

export default connect(mapStateToProps, mapDispatchToProps)(Artist);
