import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'

import { selectors as userIsAuth, userReducer } from '../../store/userReducer'
import Logo from '../../assets/img/logo.svg'

import './navbar.scss'

export const Navbar = () => {
  const isAuth = useSelector(userIsAuth.isAuth)
  const dispatch = useDispatch()

  const enterLink = (!isAuth &&
    <div className="navbar__login">
      <NavLink to="/login">Войти</NavLink>
    </div>)

  const registerLink = (!isAuth &&
    <div className="navbar__registration">
      <NavLink to="/registration">Регистрация</NavLink>
    </div>)

  const exitLink = (isAuth &&
    <div
      className="navbar__login"
      onClick={() => dispatch(userReducer.actions.logOut())}
    >
      Выход
    </div>)

  return (
    <div className="navbar">
      <div className="container">
        <img src={Logo} alt="" className="navbar__logo" />
        <div className="navbar__header">MERN CLOUD</div>
        {enterLink}
        {registerLink}
        {exitLink}
      </div>
    </div>
  )
}
