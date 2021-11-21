import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFound from '../pages/NotFound/NotFound';
import ContentPage from '../pages/ContentPage/ContentPage';
import Login from '../auth/pages/Login/Login';
import Registration from '../auth/pages/Registration/Registration';

function RootAppRouting() {
  return (
    <Switch>
      <Route exact path='/404' component={NotFound} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/registration' component={Registration} />
      <Route path='/' component={ContentPage} />
    </Switch>
  );
}

export default RootAppRouting;
