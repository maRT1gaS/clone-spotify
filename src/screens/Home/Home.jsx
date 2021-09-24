import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ContentWrapper, MusicList, Loader } from '../../components/index';
import { loadingAction } from '../../redux/actions/loadingAction';

const Home = ({ loadingMusic, isLoading, recomendationMusic }) => {
  useEffect(() => {
    if (recomendationMusic.length === 0) {
      loadingMusic('/recommendations', 'HOME');
    }
  }, [loadingMusic, recomendationMusic.length]);

  return (
    <>
      <Helmet>
        <title>Главная</title>
      </Helmet>
      <ContentWrapper>
        {isLoading ? (
          <Loader />
        ) : (
          <MusicList name='Рекомендации' music={recomendationMusic} />
        )}
      </ContentWrapper>
    </>
  );
};

Home.propTypes = {
  loadingMusic: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  recomendationMusic: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.loadingReducer.isLoading,
  recomendationMusic: state.loadingReducer.recomendationMusic,
});

const mapDispatchToProps = (dispatch) => ({
  loadingMusic: (url, type) => dispatch(loadingAction(url, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
