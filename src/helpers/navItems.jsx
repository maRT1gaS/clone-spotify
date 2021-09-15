import React from 'react';
import Home from '../assets/svg/home.svg';
import Search from '../assets/svg/loupe.svg';
import MediaLibrary from '../assets/svg/medialibrary.svg';

export const navItems = [
  {
    icon: <Home />,
    path: '/',
    name: 'Главная',
  },
  {
    icon: <Search />,
    path: '/search',
    name: 'Поиск',
  },
  {
    icon: <MediaLibrary />,
    path: '/medialibrary',
    name: 'Моя медиатека',
  },
];
