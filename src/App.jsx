import { BrowserRouter, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme/theme.config'
import './App.css'
import ProtectedRoute from './context/ProtectedRoute';
import UnprotectedRoute from './context/UnprotectedRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <ProtectedRoute>
            {/* Put all the pages in here, except login page and register page */}
          </ProtectedRoute>
          <UnprotectedRoute>
            {/* Put login page and register page here */}
          </UnprotectedRoute>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
