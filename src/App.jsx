import React from 'react';
// import { useRoutes } from 'react-router-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme.config';
import ProtectedRoute from './restaurantSide/context/ProtectedRoute';
import UnprotectedRoute from './restaurantSide/context/UnprotectedRoute';
import HomePage from './restaurantSide/pages/HomePage';
import HistoryPage from './restaurantSide/pages/HistoryPage';
import SettingsPage from './restaurantSide/pages/settings/SettingsPage'
import './App.css';
import SignUp from './restaurantSide/pages/auth/SignUp';
import Login from './restaurantSide/pages/auth/Login';
import AuthProvider from './restaurantSide/context/AuthContext';
import ForgotPasswordHost from './restaurantSide/pages/auth/ForgotPasswordHost';
import EditTableTimeSlot from './restaurantSide/pages/EditTable&TimeSlot';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/restaurant/overview" element={<HomePage />} />
              <Route path="/restaurant/history" element={<HistoryPage />} />
              <Route path='/restaurant/edit-profile' element={<SettingsPage/>} />
              <Route path="/restaurant/edit-tables&timeslots" element={<EditTableTimeSlot />} />
            </Route>
            <Route element={<UnprotectedRoute />}>
              <Route path="/restaurant/forgot-password" element={<ForgotPasswordHost />} />  
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
