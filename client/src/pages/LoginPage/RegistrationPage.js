import React, { useState } from 'react';

import { Input } from '../../components/input/Input'
import { registration } from "../../actions/user";

import './registration.scss'

export const RegistrationPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className='registration'>
      <div className="registration__header">Регистрация</div>
      <Input
        value={email}
        setValue={setEmail}
        type="text"
        placeholder="Введите email..."
      />
      <Input
        value={password}
        setValue={setPassword}
        type="password"
        placeholder="Введите пароль..."
      />
      <button
        className="registration__btn"
        onClick={() => registration(email, password)}
      >
        Войти
      </button>
    </div>
  );
};
