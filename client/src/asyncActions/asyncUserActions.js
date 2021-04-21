import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userReducer } from '../store/userReducer';

export const registration = createAsyncThunk(
  'userReducer/registration',
  async (options) => {
    try {
      const { email, password } = options
      const response = await axios.post(`http://localhost:5000/api/auth/registration`, {
        email,
        password
      })
      console.log(response.data.msg);
    } catch (e) {
      console.log(e.response.data.msg)
    }
  }
)

export const login = createAsyncThunk(
  'userReducer/login',
  async (options, { dispatch }) => {
    try {
      const { email, password } = options
      const response = await axios.post(`http://localhost:5000/api/auth/login`, {
        email,
        password
      })

      dispatch(userReducer.actions.setUser(response.data.user))
      localStorage.setItem('token', response.data.token)
    } catch (err) {
      console.log(err);
    }
  }
)

export const auth = createAsyncThunk(
  'userReducer/auth',
  async (_, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await axios.get(`http://localhost:5000/api/auth/auth`,
        { headers: { Authorization: `${localStorage.getItem('token')}` } }
      )
      dispatch(userReducer.actions.setUser(response.data.user))
      localStorage.setItem('token', response.data.token)
    } catch (e) {
      console.log(e.response.data.message)
      localStorage.removeItem('token')
    }
  }
)
