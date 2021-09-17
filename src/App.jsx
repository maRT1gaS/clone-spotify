import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './App.module.css';
import NotFound from './pages/NotFound/NotFound';
import ContentPage from './pages/ContentPage/ContentPage';
import { LoaderPage } from './components/index';
import Login from './auth/pages/Login/Login';
import Registration from './auth/pages/Registration/Registration';

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => setLoading(false), []);
  return (
    <div className={styles.wrapper}>
      {loading ? (
        <LoaderPage />
      ) : (
        <Switch>
          <Route exact path='/404' component={NotFound} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/registration' component={Registration} />
          <Route path='/' component={ContentPage} />
        </Switch>
      )}
    </div>
  );
};

export default App;
