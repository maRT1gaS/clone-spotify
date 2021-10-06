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
import { LIBRARY } from '../../redux/actionTypes';

const MediaLibrary = ({ library, isLoading, loadingSongs }) => {
  useEffect(() => {
    loadingSongs('/library', LIBRARY);
  }, [loadingSongs]);
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
            {library?.library && library.library.length > 0 ? (
              <MusicList name='Твои аудиозаписи' songs={library.library} />
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
  loadingSongs: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  library: PropTypes.shape({
    id: PropTypes.string,
    library: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.loadingData.isLoading,
  library: state.loadingData.library,
  idUser: state.authorization.id,
});

const mapDispatchToProps = (dispatch) => ({
  loadingSongs: (url, type) => dispatch(loadingAction(url, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MediaLibrary);
