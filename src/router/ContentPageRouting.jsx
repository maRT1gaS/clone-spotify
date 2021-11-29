import React, { lazy } from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';

const LazyHome = lazy(() =>
  import(/* webpackChunkName: 'home' */ '../screens/Home/Home')
);
const LazySearch = lazy(() =>
  import(/* webpackChunkName: 'search' */ '../screens/Search/Search')
);
const LazyMediaLibrary = lazy(() =>
  import(
    /* webpackChunkName: 'medialibrary' */ '../screens/MediaLibrary/MediaLibrary'
  )
);
const LazyArtist = lazy(() =>
  import(/* webpackChunkName: 'artist' */ '../screens/Artist/Artist')
);
const LazyAlbum = lazy(() =>
  import(/* webpackChunkName: 'album' */ '../screens/Album/Album')
);
const LazyPlayingPlaylist = lazy(() =>
  import(
    /* webpackChunkName: 'playing-playlist' */ '../screens/PlayingPlaylist/PlayingPlaylist'
  )
);

function ContentPageRouting({ value, isAuth }) {
  return (
    <div>
      <Switch>
        <ProtectedRoute isAuth={isAuth} exact path='/'>
          <LazyHome />
        </ProtectedRoute>
        <ProtectedRoute isAuth={isAuth} exact path='/search'>
          <LazySearch searchValue={value} />
        </ProtectedRoute>
        <ProtectedRoute isAuth={isAuth} path='/medialibrary'>
          <LazyMediaLibrary />
        </ProtectedRoute>
        <ProtectedRoute isAuth={isAuth} exact path='/artist/:id'>
          <LazyArtist />
        </ProtectedRoute>
        <ProtectedRoute isAuth={isAuth} exact path='/album/:id'>
          <LazyAlbum />
        </ProtectedRoute>
        <ProtectedRoute isAuth={isAuth} exact path='/playingplaylist'>
          <LazyPlayingPlaylist />
        </ProtectedRoute>
        <Redirect to='/404' />
      </Switch>
    </div>
  );
}

ContentPageRouting.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({ isAuth: state.authorization.isAuth });

export default connect(mapStateToProps)(ContentPageRouting);
