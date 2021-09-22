import React from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './NotFound.module.css';
import { Logo, CustomLink } from '../../components/index';

const NotFound = ({ isAuth }) => (
  <>
    <Helmet>
      <title>Страницы не существует</title>
    </Helmet>
    <div className='flex justify-content-c align-items-c fullscreen'>
      <div className='flex flex-direction-col align-items-c'>
        <Logo path={isAuth ? '/' : '/login'} />
        <h2 className={styles.error}>404</h2>
        <p className={styles.info}>Информация не найдена...</p>
        <CustomLink size='bg' path={isAuth ? '/' : '/login'}>
          {isAuth ? 'На главную' : 'Авторизация'}
        </CustomLink>
      </div>
    </div>
  </>
);

const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth,
});

NotFound.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(NotFound);
