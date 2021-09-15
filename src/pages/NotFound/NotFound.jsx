import React from 'react';
import { Helmet } from 'react-helmet-async';

const NotFound = () => (
  <>
    <Helmet>
      <title>Страницы не существует</title>
    </Helmet>
    <div>
      <h2>NotFound</h2>
    </div>
  </>
);

export default NotFound;
