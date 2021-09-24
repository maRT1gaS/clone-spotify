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

const Search = ({ search, isLoading, loadingSearchData, searchData }) => {
  useEffect(() => {
    loadingSearchData(`/search?query=${search}`, 'SEARCH');
  }, [loadingSearchData, search, searchData.length]);

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
            {searchData?.songs && searchData.songs.length > 0 && (
              <MusicList name='Песни' music={searchData.songs} />
            )}
            {searchData?.artists && searchData.artists.length > 0 && (
              <CardsList
                name='Артисты'
                type='artist'
                data={searchData.artists}
              />
            )}
            {searchData?.albums && searchData.albums.length > 0 && (
              <CardsList name='Альбомы' type='album' data={searchData.albums} />
            )}
            {searchData?.songs.length === 0 &&
              searchData?.artists.length === 0 &&
              searchData?.albums.length === 0 && (
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
  searchData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  loadingSearchData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.loadingReducer.isLoading,
  searchData: state.loadingReducer.searchData,
});

const mapDispatchToProps = (dispatch) => ({
  loadingSearchData: (url, type) => dispatch(loadingAction(url, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
