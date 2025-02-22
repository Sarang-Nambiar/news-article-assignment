import { createTheme, ThemeProvider } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Home'
import CreateArticles from './CreateArticles'
import PageNotFound from './Components/PageNotFound'
import Navbar from './Components/Navbar'
import { useState } from 'react'

function App() {
  const [visible, setVisible] = useState<boolean>(true)
  const theme = createTheme({
    palette: {
      primary: {
        main: '#22D3EE'
      }
  }})

  return (
    <ThemeProvider theme={theme}>
      <Navbar visible={visible} />
      <Routes>
        <Route path="/" element={<Home setVisible={setVisible} />} />
        <Route path="/create" element={<CreateArticles setVisible={setVisible} />} />
        <Route path="*" element={<PageNotFound setVisible={setVisible} />} />
      </Routes>
    </ThemeProvider>      
  )
}

export default App
