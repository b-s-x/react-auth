import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Input } from '../../components/input/Input';
import { login } from '../../asyncActions/asyncUserActions';

import './registration.scss'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  return (
    <div className='registration'>
      <div className='registration__header'>Авторизация</div>
      <Input
        value={email}
        setValue={setEmail}
        type='text'
        placeholder='Введите email...'
      />
      <Input
        value={password}
        setValue={setPassword}
        type='password'
        placeholder='Введите пароль...'
      />
      <button
        className='registration__btn'
        onClick={() => dispatch(login({email, password}))}
        // onClick={() => dispatch(test(1111))}
      >
        Войти
        </button>
    </div>
  );
};
