import React from 'react';
// import { useRoutes } from 'react-router-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme.config';
import './App.css';
import ProtectedRoute from './context/ProtectedRoute';
import UnprotectedRoute from './context/UnprotectedRoute';
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import RestaurantInfo from './pages/RestaurantInfo'

function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute/>}>

          </Route>
          <Route element={<UnprotectedRoute/>}>

          </Route>
          <Route>
          <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/restaurantInfo" element={<RestaurantInfo />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
