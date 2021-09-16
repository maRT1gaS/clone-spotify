import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { VerticalNav } from '../../components/index';
import UIKits from '../../screens/UIKits/UIKits';
import Home from '../../screens/Home/Home';
import Search from '../../screens/Search/Search';
import MediaLibrary from '../../screens/MediaLibrary/MediaLibrary';

const ContentPage = () => (
  <>
    <VerticalNav />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/search' component={Search} />
      <Route exact path='/medialibrary' component={MediaLibrary} />
      <Route exact path='/uikits' component={UIKits} />
      <Redirect to='/404' />
    </Switch>
  </>
);

export default ContentPage;
