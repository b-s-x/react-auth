import React, { useState } from 'react';

import { Input } from '../../components/input/Input'
import { registration } from '../../asyncActions/asyncUserActions';

import './registration.scss'
import { useDispatch } from 'react-redux';

export const RegistrationPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const formHandler = () => {
    dispatch(registration({ email, password }))
    setEmail('')
    setPassword('')
  }

  return (
    <div className='registration'>
      <div className='registration__header'>Регистрация</div>
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
        onClick={formHandler}
      >
        Войти
      </button>
    </div>
  );
};
