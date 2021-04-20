import axios from 'axios'
import { setUser } from "../reducers/userReducer";

export const registration = async (email, password) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/auth/registration`, {
      email,
      password
    })
    console.log(response.data.message)
  } catch (e) {
    console.log(e.response.data.message)
  }
}

export const login = (email, password) => {
  return async dispatch => {
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/login`, {
        email,
        password
      })
      console.log(response.data);
      dispatch(setUser(response.data.user))
      localStorage.setItem('token', response.data.token)
    } catch (e) {
      console.log(e.response.data.message)
    }
  }
}

export const auth = () => {
  return async dispatch => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await axios.get(`http://localhost:5000/api/auth/auth`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )

      let x = dispatch(setUser(response.data.user))
      localStorage.setItem('token', response.data.token)
    } catch (e) {
      console.log(e.response.data.message)
      localStorage.removeItem('token')
    }
  }
}