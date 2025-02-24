import { createTheme, ThemeProvider } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import CreateArticles from './pages/CreateArticles/CreateArticles'
import PageNotFound from './Components/PageNotFound'
import Navbar from './Components/Navbar'
import { ToastContainer, Bounce } from 'react-toastify';
import { useState } from 'react'

interface ThemeProps {
  primary: {
    main: string
    contrastText: string
  }
  secondary: {
    main: string
    contrastText: string
  }
}

const originalTheme: ThemeProps = {
  primary: {
    main: '#22D3EE',
    contrastText: "#000"
  },
  secondary: {
    main: '#808080',
    contrastText: "#fff"
  },
}

function App() {
  const [visible, setVisible] = useState<boolean>(true)
  const theme = createTheme({
    palette: {...originalTheme}})

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

export { originalTheme };
