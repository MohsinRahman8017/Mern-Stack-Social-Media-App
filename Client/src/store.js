import { configureStore } from '@reduxjs/toolkit'
import ThemeMode from "./components/Home/Left-Side-Bar/themeSlice"

export const store = configureStore({
  reducer: {
    theme:ThemeMode
  },
})

