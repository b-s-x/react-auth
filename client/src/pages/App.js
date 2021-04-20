import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Navbar } from '../components/navbar/Navbar'
import { RegistrationPage } from './LoginPage/RegistrationPage';
import { LoginPage } from './LoginPage/LoginPage';

import { auth } from '../actions/user'
import { selectors as userIsAuth } from '../store/userReducer'

import './app.scss'

const App = () => {
  const isAuth = useSelector(userIsAuth.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className='app'>
        <Navbar />
        <div className='wrap'>
          {!isAuth &&
            <Switch>
              <Route path='/registration' component={ RegistrationPage } />
              <Route path='/login' component={ LoginPage } />
            </Switch>
          }
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
