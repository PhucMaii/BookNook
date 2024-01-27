import { BrowserRouter, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme/theme.config'
import './App.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
