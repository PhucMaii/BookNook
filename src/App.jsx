import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme.config';
import './App.css';
import ProtectedRoute from './context/ProtectedRoute';
import UnprotectedRoute from './context/UnprotectedRoute';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute/>}>

          </Route>
          <Route element={<UnprotectedRoute/>}>

          </Route>
          
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
