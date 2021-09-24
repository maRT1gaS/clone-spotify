import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ContentWrapper,
  MusicList,
  Loader,
  ContentNotification,
} from '../../components/index';
import { loadingAction } from '../../redux/actions/loadingAction';

const MediaLibrary = ({ librarySongs, isLoading, loadingMusic, idUser }) => {
  useEffect(() => {
    loadingMusic('/library', 'LIBRARY', idUser);
  }, [idUser, loadingMusic]);
  return (
    <>
      <Helmet>
        <title>Моя медиатека</title>
      </Helmet>
      <ContentWrapper>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {librarySongs.length > 0 ? (
              <MusicList name='Твои аудиозаписи' music={librarySongs} />
            ) : (
              <ContentNotification title='У вас нет аудиозаписей' />
            )}
          </>
        )}
      </ContentWrapper>
    </>
  );
};

MediaLibrary.propTypes = {
  loadingMusic: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  librarySongs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  idUser: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.loadingReducer.isLoading,
  librarySongs: state.loadingReducer.librarySongs,
  idUser: state.authReducer.id,
});

const mapDispatchToProps = (dispatch) => ({
  loadingMusic: (url, type, idUser) =>
    dispatch(loadingAction(url, type, idUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MediaLibrary);
