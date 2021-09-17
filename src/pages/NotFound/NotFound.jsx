import React from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './NotFound.module.css';
import { Logo, CustomLink } from '../../components/index';

const NotFound = () => (
  <>
    <Helmet>
      <title>Страницы не существует</title>
    </Helmet>
    <div className='flex justify-content-c align-items-c fullscreen'>
      <div className='flex flex-direction-col align-items-c'>
        <Logo />
        <h2 className={styles.error}>404</h2>
        <p className={styles.info}>Информация не найдена...</p>
        <CustomLink size='bg' path='/'>
          На главную
        </CustomLink>
      </div>
    </div>
  </>
);

export default NotFound;
