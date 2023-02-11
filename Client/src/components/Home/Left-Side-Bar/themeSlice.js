import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode:" "
}

export const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {

    ThemeMode: (state, action) => {
        state.mode = action.payload
      },
    },
  })

// Action creators are generated for each case reducer function
export const {ThemeMode} = ThemeSlice.actions

export default ThemeSlice.reducer