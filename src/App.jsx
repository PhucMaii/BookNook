import React from 'react';
// import { useRoutes } from 'react-router-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme.config';
import ProtectedRoute from './restaurantSide/context/ProtectedRoute';
import UnprotectedRoute from './restaurantSide/context/UnprotectedRoute';
import HomePage from './restaurantSide/pages/HomePage';
import HistoryPage from './restaurantSide/pages/HistoryPage';
import './App.css';
import SignUp from './restaurantSide/pages/auth/SignUp';
import Login from './restaurantSide/pages/auth/Login';
import AuthProvider from './restaurantSide/context/AuthContext';
import ForgotPasswordHost from './restaurantSide/pages/auth/ForgotPasswordHost';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/restaurant/overview" element={<HomePage />} />
              <Route path="/restaurant/history" element={<HistoryPage />} />
            </Route>
            <Route element={<UnprotectedRoute />}>
              <Route path="/restaurant/forgotpasswordhost" element={<ForgotPasswordHost />} />  
              <Route path="/restaurant/login" element={<Login />} />
            </Route>
            <Route path="/restaurant/signup" element={<SignUp />} />
          </Routes>
            
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App
