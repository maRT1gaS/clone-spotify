import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './App.module.css';
import NotFound from './pages/NotFound/NotFound';
import ContentPage from './pages/ContentPage/ContentPage';
import { LoaderPage } from './components/index';

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
          <Route path='/' component={ContentPage} />
        </Switch>
      )}
    </div>
  );
};

export default App;
