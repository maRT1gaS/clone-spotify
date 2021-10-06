import React, { useState, useEffect } from 'react';
import { Switch, Redirect, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  VerticalNav,
  ContentHeader,
  HeaderUser,
  Input,
  Form,
  ProtectedRoute,
  ContentError,
} from '../../components/index';
import Home from '../../screens/Home/Home';
import Search from '../../screens/Search/Search';
import MediaLibrary from '../../screens/MediaLibrary/MediaLibrary';
import Artist from '../../screens/Artist/Artist';
import Album from '../../screens/Album/Album';
import styles from './ContentPage.module.css';
import SearchIcon from '../../assets/svg/loupe.svg';
import MediaPlayer from '../../components/MediaPlayer/MediaPlayer';

const ContentPage = ({ name, isAuth, isError, textError }) => {
  const [value, setValue] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/search') {
      const searchInput = document.getElementById('search');
      searchInput.focus();
    }
  });

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClear = () => setValue('');

  return (
    <div className={`${styles.wrapperContent} fullscreen`}>
      <VerticalNav style={{ gridArea: 'verticalNav' }} />
      <div className={styles.contentWrapper}>
        <ContentHeader>
          <div style={{ flex: '0 1 30rem' }}>
            {location.pathname === '/search' && (
              <Form role='search' legend='Поиск песен, подкастов, музыкантов'>
                <Input
                  label='Поиск подкастов, музыки'
                  id='search'
                  value={value}
                  onChange={handleChange}
                  type='search'
                  preIcon={<SearchIcon />}
                  placeholder='Исполнитель, трек или подкаст'
                  clearIcon
                  handleClear={handleClear}
                  autoComplete='off'
                />
              </Form>
            )}
          </div>
          <HeaderUser name={name} />
        </ContentHeader>
        <div style={{ position: 'relative' }}>
          {isError && <ContentError title={textError} />}
          <Switch>
            <ProtectedRoute isAuth={isAuth} exact path='/' component={Home} />
            <ProtectedRoute isAuth={isAuth} path='/search'>
              <Search search={value} />
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
            <Redirect to='/404' />
          </Switch>
        </div>
      </div>
      <MediaPlayer />
    </div>
  );
};

ContentPage.propTypes = {
  name: PropTypes.string.isRequired,
  isAuth: PropTypes.bool.isRequired,
  // currentSong: PropTypes.shape().isRequired,
  isError: PropTypes.bool.isRequired,
  textError: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.authorization.name,
  isAuth: state.authorization.isAuth,
  // currentSong: state.playingSong.currentSong,
  isError: state.loadingData.isError,
  textError: state.loadingData.textError,
});

export default connect(mapStateToProps)(ContentPage);
