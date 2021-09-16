import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Input, Button, LoaderPage } from '../../components/index';
import Search from '../../assets/svg/loupe.svg';

const UIKits = () => (
  <>
    <Helmet>
      <title>UIKits</title>
    </Helmet>
    <div>
      <Input
        type='text'
        icon={<Search />}
        placeholder='Исполнитель, трек или подкаст'
      />
      <Button>Войти</Button>
      <LoaderPage />
    </div>
  </>
);

export default UIKits;
