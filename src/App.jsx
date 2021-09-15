import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UIKits from './pages/UIKits/UIKits';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import MediaLibrary from './pages/MediaLibrary/MediaLibrary';
import NotFound from './pages/NotFound/NotFound';
import { VerticalNav } from './components/index';
import styles from './App.module.css';

const App = () => (
  <div className={styles.wrapper}>
    <VerticalNav />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/search' component={Search} />
      <Route exact path='/medialibrary' component={MediaLibrary} />
      <Route exact path='/uikits' component={UIKits} />
      <Route path='*' component={NotFound} />
    </Switch>
  </div>
);

export default App;
