import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  ContentWrapper,
  CardsList,
  MusicList,
  Loader,
  ContentNotification,
} from '../../components/index';
import { loadingAction } from '../../redux/actions/loadingAction';
import { ALL } from '../../redux/actionTypes';

const Search = ({
  search,
  isLoading,
  loadingSearchData,
  songs,
  artists,
  albums,
}) => {
  useEffect(() => {
    loadingSearchData(`/search?query=${search}`, ALL);
  }, [loadingSearchData, search]);

  return (
    <>
      <Helmet>
        <title>Поиск</title>
      </Helmet>
      <ContentWrapper>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {songs.length > 0 && <MusicList name='Песни' songs={songs} />}
            {artists.length > 0 && (
              <CardsList name='Артисты' type='artist' data={artists} />
            )}
            {albums.length > 0 && (
              <CardsList name='Альбомы' type='album' data={albums} />
            )}
            {songs.length === 0 &&
              artists.length === 0 &&
              albums.length === 0 && (
                <ContentNotification title='Ничего не найдено...' />
              )}
          </>
        )}
      </ContentWrapper>
    </>
  );
};

Search.propTypes = {
  search: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  songs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  artists: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadingSearchData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.loadingData.isLoading,
  songs: state.loadingData.songs,
  artists: state.loadingData.artists,
  albums: state.loadingData.albums,
});

const mapDispatchToProps = (dispatch) => ({
  loadingSearchData: (url, type) => dispatch(loadingAction(url, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
