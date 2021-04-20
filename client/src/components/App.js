import React, { useEffect } from 'react'
import { Navbar } from './navbar/Navbar'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Registration from "./registration/Registration";
import Login from './registration/Login';
import { auth } from '../actions/user'

import './app.scss'
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])

  return (
    <BrowserRouter>
      <div className='app'>
        <Navbar />
        <div className="wrap">
          {!isAuth &&
            <Switch>
              <Route path="/registration" component={Registration} />
              <Route path="/login" component={Login} />
            </Switch>
          }
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
