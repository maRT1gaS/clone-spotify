import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import axios from 'axios';

import AuthContainer from '../../components/AuthContainer/AuthContainer';
import AuthTitle from '../../components/AuthTitle/AuthTitle';
import { Input, Button, Form, Logo } from '../../../components/index';

import EmailIcon from '../../../assets/svg/email.svg';
import PasswordIcon from '../../../assets/svg/padlock.svg';
import UserIcon from '../../../assets/svg/user.svg';

import styles from './Registration.module.css';

const Registration = () => {
  const [nameInp, setNameInp] = useState('');
  const [emailInp, setEmailInp] = useState('');
  const [passwordInp, setPasswordInp] = useState('');
  const [copyPasswordInp, setCopyPasswordInp] = useState('');

  const handleNameInp = (e) => setNameInp(e.target.value);

  const handleEmailInp = (e) => setEmailInp(e.target.value);

  const handlePasswordInp = (e) => setPasswordInp(e.target.value);

  const handleCopyPasswordInp = (e) => setCopyPasswordInp(e.target.value);

  const handleAuthorization = (e) => {
    e.preventDefault();

    const data = {
      name: nameInp,
      email: emailInp,
      password: passwordInp,
    };

    axios.post('http://localhost:5000/api/auth/signup', {
      ...data,
    });

    setPasswordInp('');
    setEmailInp('');
    setCopyPasswordInp('');
    setNameInp('');
  };

  return (
    <>
      <Helmet>
        <title>Регистрация</title>
      </Helmet>
      <div
        className='flex justify-content-c align-items-c flex-direction-col'
        style={{ width: '100%', minHeight: '100vh' }}
      >
        <Logo />
        <AuthContainer>
          <AuthTitle>Регистрация</AuthTitle>
          <Form legend='Регистрация' onSubmit={handleAuthorization} role='form'>
            <div className={styles.formContent}>
              <div className={styles.formInputs}>
                <Input
                  value={nameInp}
                  onChange={handleNameInp}
                  placeholder='Введите вашe имя'
                  type='text'
                  id='name'
                  text='Введите ваше имя'
                  preIcon={<UserIcon />}
                />

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

                <Input
                  value={copyPasswordInp}
                  onChange={handleCopyPasswordInp}
                  placeholder='Повторите ваш пароль'
                  type='password'
                  id='passwordcopy'
                  text='Повторите ваш пароль'
                  preIcon={<PasswordIcon />}
                />
              </div>
              <Button type='submit'>Зарегестрироваться</Button>
            </div>
          </Form>
          <Link to='/login'>Уже есть аккаунт?</Link>
        </AuthContainer>
      </div>
    </>
  );
};

export default Registration;
