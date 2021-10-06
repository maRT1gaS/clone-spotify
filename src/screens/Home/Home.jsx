import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ContentWrapper, MusicList, Loader } from '../../components/index';
import { loadingAction } from '../../redux/actions/loadingAction';
import { SONGS } from '../../redux/actionTypes';

const Home = ({ loadingSongs, isLoading, songs }) => {
  useEffect(() => {
    loadingSongs('/recommendations', SONGS);
  }, [loadingSongs]);

  return (
    <>
      <Helmet>
        <title>Главная</title>
      </Helmet>
      <ContentWrapper>
        {isLoading ? (
          <Loader />
        ) : (
          <MusicList name='Рекомендации' songs={songs} />
        )}
      </ContentWrapper>
    </>
  );
};

Home.propTypes = {
  loadingSongs: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  songs: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.loadingData.isLoading,
  songs: state.loadingData.songs,
});

const mapDispatchToProps = (dispatch) => ({
  loadingSongs: (url, type) => dispatch(loadingAction(url, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
