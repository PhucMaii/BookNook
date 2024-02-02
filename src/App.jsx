import React from 'react';
// import { useRoutes } from 'react-router-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme.config';
import ProtectedRoute from './restaurantSide/context/ProtectedRoute';
import UnprotectedRoute from './restaurantSide/context/UnprotectedRoute';
import HomePage from './restaurantSide/pages/HomePage';
import HistoryPage from './restaurantSide/pages/History/HistoryPage';
import './App.css';
import SignUp from './restaurantSide/pages/auth/SignUp';
import Login from './restaurantSide/pages/auth/Login';
import RestaurantInfo from './restaurantSide/pages/auth/RestaurantInfo';


function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute/>}>

          </Route>
          <Route element={<UnprotectedRoute/>}>

          </Route>
          <Route path="/restaurant/signup" element={<SignUp />} />
          <Route path="/restaurant/login" element={<Login />} />
          <Route path="/restaurant/create-info" element={<RestaurantInfo />} />

          <Route path="/overview" element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
