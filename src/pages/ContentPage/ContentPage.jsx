import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { VerticalNav } from '../../components/index';
import UIKits from '../../screens/UIKits/UIKits';
import Home from '../../screens/Home/Home';
import Search from '../../screens/Search/Search';
import MediaLibrary from '../../screens/MediaLibrary/MediaLibrary';
import styles from './ContentPage.module.css';

const ContentPage = () => (
  <div className={styles.wrapperContent}>
    <VerticalNav />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/search' component={Search} />
      <Route exact path='/medialibrary' component={MediaLibrary} />
      <Route exact path='/uikits' component={UIKits} />
      <Redirect to='/404' />
    </Switch>
  </div>
);

export default ContentPage;
