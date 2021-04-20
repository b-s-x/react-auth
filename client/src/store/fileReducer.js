import { createSlice } from '@reduxjs/toolkit'

export const fileReducer = createSlice({
  name: 'fileReducer',
  initialState: {
    default: {}
  },
  reducers: {
    set: (state) => {
      state.default = {}
    }
  }
})
