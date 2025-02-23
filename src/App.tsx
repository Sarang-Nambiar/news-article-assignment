import { createTheme, ThemeProvider } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Home'
import CreateArticles from './CreateArticles'
import PageNotFound from './Components/PageNotFound'
import Navbar from './Components/Navbar'
import { ToastContainer, Bounce } from 'react-toastify';
import { useState } from 'react'

function App() {
  const [visible, setVisible] = useState<boolean>(true)
  const theme = createTheme({
    palette: {
      primary: {
        main: '#22D3EE'
      },
      secondary: {
        main: '#808080'
      }
  }})

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Bounce}
      />
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
