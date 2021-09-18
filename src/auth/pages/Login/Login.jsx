import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

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

const Login = () => {
  const [emailInp, setEmailInp] = useState('');
  const [passwordInp, setPasswordInp] = useState('');

  const handleEmailInp = (e) => setEmailInp(e.target.value);

  const handlePasswordInp = (e) => setPasswordInp(e.target.value);

  const handleAuthorization = (e) => {
    e.preventDefault();
    const data = {
      email: emailInp,
      password: passwordInp,
    };

    axios
      .post('/api/auth/signin', {
        ...data,
      })
      .then((res) => {
        console.log(res);
      });

    setEmailInp('');
    setPasswordInp('');
  };

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
                placeholder='Введите ваш email'
                type='email'
                id='email'
                text='Введите ваш email'
                preIcon={<EmailIcon />}
              />

              <Input
                value={passwordInp}
                onChange={handlePasswordInp}
                placeholder='Введите ваш пароль'
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

export default Login;
