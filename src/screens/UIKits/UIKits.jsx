import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Input, Button, LoaderPage } from '../../components/index';
import Search from '../../assets/svg/loupe.svg';
import ClearIcon from '../../assets/svg/delete.svg';

const UIKits = () => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClear = () => setValue('');

  return (
    <>
      <Helmet>
        <title>UIKits</title>
      </Helmet>
      <div>
        <Input
          text='Поиск подкастов, музыки'
          id='search'
          value={value}
          onChange={handleChange}
          type='search'
          preIcon={<Search />}
          placeholder='Исполнитель, трек или подкаст'
          clearIcon
          hadlerClear={handleClear}
        />
        <Button>Войти</Button>
        <LoaderPage />
        <ClearIcon />
      </div>
    </>
  );
};

export default UIKits;
