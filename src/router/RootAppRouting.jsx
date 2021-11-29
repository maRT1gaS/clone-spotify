import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Loader } from '../components';

import ContentPage from '../pages/ContentPage/ContentPage';
import Login from '../auth/pages/Login/Login';
import Registration from '../auth/pages/Registration/Registration';

const LazyNotFound = lazy(() =>
  import(/* webpackChunkName: 'not-found' */ '../pages/NotFound/NotFound')
);

function RootAppRouting() {
  return (
    <Switch>
      <Route exact path='/404'>
        <Suspense fallback={Loader}>
          <LazyNotFound />
        </Suspense>
      </Route>
      <Route exact path='/login' component={Login} />
      <Route exact path='/registration' component={Registration} />
      <Route path='/' component={ContentPage} />
    </Switch>
  );
}

export default RootAppRouting;
