import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Home from '../screens/Home/Home';
import Search from '../screens/Search/Search';
import MediaLibrary from '../screens/MediaLibrary/MediaLibrary';
import Artist from '../screens/Artist/Artist';
import Album from '../screens/Album/Album';
import PlayingPlaylist from '../screens/PlayingPlaylist/PlayingPlaylist';
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';

function ContentPageRouting({ value, isAuth }) {
  return (
    <div>
      <Switch>
        <ProtectedRoute isAuth={isAuth} exact path='/' component={Home} />
        <ProtectedRoute isAuth={isAuth} exact path='/search'>
          <Search searchValue={value} />
        </ProtectedRoute>
        <ProtectedRoute
          isAuth={isAuth}
          path='/medialibrary'
          component={MediaLibrary}
        />
        <ProtectedRoute
          isAuth={isAuth}
          exact
          path='/artist/:id'
          component={Artist}
        />
        <ProtectedRoute
          isAuth={isAuth}
          exact
          path='/album/:id'
          component={Album}
        />
        <ProtectedRoute
          isAuth={isAuth}
          exact
          path='/playingplaylist'
          component={PlayingPlaylist}
        />
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
