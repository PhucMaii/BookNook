import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme.config';
import ProtectedRoute from './restaurantSide/context/ProtectedRoute';
import UnprotectedRoute from './restaurantSide/context/UnprotectedRoute';
import HomePage from './restaurantSide/pages/HomePage';
import HistoryPage from './restaurantSide/pages/HistoryPage';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute/>}>

          </Route>
          <Route element={<UnprotectedRoute/>}>

          </Route>
          <Route path="/overview" element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
