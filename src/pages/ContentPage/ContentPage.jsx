import React, { useState } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  VerticalNav,
  MediaPlayer,
  ContentHeader,
  HeaderUser,
  Input,
  Form,
} from '../../components/index';
import UIKits from '../../screens/UIKits/UIKits';
import Home from '../../screens/Home/Home';
import Search from '../../screens/Search/Search';
import MediaLibrary from '../../screens/MediaLibrary/MediaLibrary';
import styles from './ContentPage.module.css';
import SearchIcon from '../../assets/svg/loupe.svg';

const ContentPage = ({ name }) => {
  const [value, setValue] = useState('');
  const location = useLocation();

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
                  text='Поиск подкастов, музыки'
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
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/search' component={Search} />
          <Route exact path='/medialibrary' component={MediaLibrary} />
          <Route exact path='/uikits' component={UIKits} />
          <Redirect to='/404' />
        </Switch>
      </div>
      <MediaPlayer>
        <h2>MediaPlayer</h2>
      </MediaPlayer>
    </div>
  );
};

ContentPage.propTypes = {
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.authReducer.name,
});

export default connect(mapStateToProps)(ContentPage);
