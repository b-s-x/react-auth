import { createSlice } from '@reduxjs/toolkit'

export const userReducer = createSlice({
  name: 'userReducer',
  initialState: {
    currentUser: {},
    isAuth: false
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload
      state.isAuth = true
    },
    logOut: (state, action) => {
      localStorage.removeItem('token')
      state.currentUser = {}
      state.isAuth = false
    }
  }
})

export const selectors = {
  isAuth: state => state.userReducer.isAuth,
  currentUser: state => state.userReducer.currentUser
}
