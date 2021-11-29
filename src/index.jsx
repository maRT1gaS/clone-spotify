import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import store from './redux/store';
import { Loader } from './components/index';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter basename='/'>
          <Suspense fallback={<Loader />}>
            <App />
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('app')
);
