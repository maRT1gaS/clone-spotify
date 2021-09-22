import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import AuthContainer from '../../components/AuthContainer/AuthContainer';
import AuthTitle from '../../components/AuthTitle/AuthTitle';
import {
  Input,
  Button,
  Form,
  Logo,
  CustomLink,
} from '../../../components/index';

import EmailIcon from '../../../assets/svg/email.svg';
import PasswordIcon from '../../../assets/svg/padlock.svg';
import styles from './Login.module.css';
import { authorisationAction } from '../../../redux/actions/authAction';

const Login = ({ onAuthorisation, isAuth, typeNotification }) => {
  const [emailInp, setEmailInp] = useState('');
  const [passwordInp, setPasswordInp] = useState('');

  const handleEmailInp = (e) => setEmailInp(e.target.value);

  const handlePasswordInp = (e) => setPasswordInp(e.target.value);

  const handleAuthorization = (e) => {
    e.preventDefault();
    const authData = {
      email: emailInp,
      password: passwordInp,
    };
    onAuthorisation(authData);
  };

  useEffect(() => {
    if (!isAuth) {
      const firstInput = document.getElementById('email');
      firstInput.focus();
      if (typeNotification === 'success') {
        setPasswordInp('');
        setEmailInp('');
      }
    }
    return false;
  }, [isAuth, typeNotification]);

  if (isAuth) {
    return <Redirect push to='/' />;
  }

  return (
    <>
      <Helmet>
        <title>Вход</title>
      </Helmet>
      <div className='flex justify-content-c align-items-c flex-direction-col fullscreen'>
        <Logo />
        <AuthContainer>
          <AuthTitle>Вход</AuthTitle>
          <Form legend='Авторизация' onSubmit={handleAuthorization} role='form'>
            <div className={styles.formContent}>
              <Input
                value={emailInp}
                onChange={handleEmailInp}
                placeholder='Введите ваш email*'
                type='email'
                id='email'
                text='Введите ваш email'
                preIcon={<EmailIcon />}
              />

              <Input
                value={passwordInp}
                onChange={handlePasswordInp}
                placeholder='Введите ваш пароль*'
                type='password'
                id='password'
                text='Введите ваш пароль'
                preIcon={<PasswordIcon />}
              />
              <Button type='submit'>Войти</Button>
            </div>
          </Form>
          <CustomLink path='/registration'>Нет аккаунта?</CustomLink>
        </AuthContainer>
      </div>
    </>
  );
};

Login.propTypes = {
  onAuthorisation: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  typeNotification: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onAuthorisation: (authData) => dispatch(authorisationAction(authData)),
});

const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth,
  typeNotification: state.notificationReducer.typeNotification,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
