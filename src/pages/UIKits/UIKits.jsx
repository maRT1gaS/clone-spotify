import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Input } from '../../components/index';

const UIKits = () => (
  <>
    <Helmet>
      <title>UIKits</title>
    </Helmet>
    <div>
      <Input type='text' />
    </div>
  </>
);

export default UIKits;
