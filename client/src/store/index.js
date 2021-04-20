import thunk from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit';

import { fileReducer } from './fileReducer'
import { userReducer } from './userReducer'

const store = configureStore({
  middleware: [thunk],
  reducer: {
    fileReducer: fileReducer.reducer,
    userReducer: userReducer.reducer
  },
})

export default store