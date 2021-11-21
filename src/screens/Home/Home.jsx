import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MusicList, Loader } from '../../components/index';
import { loadingAction } from '../../redux/actions/loadingAction';
import { HOME } from '../../redux/actionTypes';

const Home = ({ loadingSongs, isLoading, songs }) => {
  useEffect(() => {
    if (songs.length === 0) {
      loadingSongs('/recommendations', HOME);
    }
  }, [loadingSongs, songs.length]);

  return (
    <>
      <Helmet>
        <title>Главная</title>
      </Helmet>
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <MusicList name='Рекомендации' songs={songs} />
        )}
      </>
    </>
  );
};

Home.propTypes = {
  loadingSongs: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  songs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.loadingData.isLoading,
  songs: state.loadingData.home,
});

const mapDispatchToProps = {
  loadingSongs: (url, type) => loadingAction(url, type),
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
