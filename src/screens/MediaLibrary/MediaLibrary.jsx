import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MusicList, Loader, ContentNotification } from '../../components/index';
import { loadingAction } from '../../redux/actions/loadingAction';
import { LIBRARY } from '../../redux/actionTypes';
import { TSong } from '../../types/Song.type';

const MediaLibrary = ({ library, isLoading, loadingSongs }) => {
  useEffect(() => {
    if (library.length === 0) {
      loadingSongs('/library', LIBRARY);
    }
  }, [library.length, loadingSongs]);
  return (
    <>
      <Helmet>
        <title>Моя медиатека</title>
      </Helmet>
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {library.length > 0 ? (
              <MusicList name='Твои аудиозаписи' songs={library} />
            ) : (
              <ContentNotification title='У вас нет аудиозаписей' />
            )}
          </>
        )}
      </>
    </>
  );
};

MediaLibrary.propTypes = {
  loadingSongs: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  library: PropTypes.arrayOf(PropTypes.shape(TSong)).isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.loadingData.isLoading,
  library: state.loadingData.library,
  idUser: state.authorization.id,
});

const mapDispatchToProps = {
  loadingSongs: (url, type) => loadingAction(url, type),
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaLibrary);
