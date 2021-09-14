import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UIKits from './pages/UIKits/UIKits';

const App = () => (
  <div className="wrapper">
    <BrowserRouter>
      <Switch>
        <Route exact path="/uikits" component={UIKits} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
