import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Input, Button, LoaderPage, Title } from '../../components/index';
import Search from '../../assets/svg/loupe.svg';
import ClearIcon from '../../assets/svg/delete.svg';
import { MusicItem } from '../../components/MusicList/MusicItem/MusicItem';

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
        <Title name='Рекомендации для тебя' />
        <MusicItem
          time={175}
          nameMusic='Deamons'
          nameArtist='Imagine Dragons'
          imageUrl='/files/covers/night-visions.jpg'
          nameAlbum='Night Visions'
        />
      </div>
    </>
  );
};

export default UIKits;
