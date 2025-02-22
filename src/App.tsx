import { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import './App.css'

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#ff0000'
      },
      secondary: {
        main: '#00ff00'
    }
  }})

  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
      </div>
    </ThemeProvider>      
  )
}

export default App
