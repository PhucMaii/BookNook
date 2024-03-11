import React from 'react';
// import { useRoutes } from 'react-router-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme.config';
import HomePage from './restaurantSide/pages/HomePage';
import HistoryPage from './restaurantSide/pages/HistoryPage';
import SettingsPage from './restaurantSide/pages/settings/SettingsPage';
import SignUp from './restaurantSide/pages/auth/SignUp';
import Login from './restaurantSide/pages/auth/Login';
import AuthProvider from './restaurantSide/context/AuthContext';
import ForgotPasswordHost from './restaurantSide/pages/auth/ForgotPasswordHost';
import EditTableTimeSlot from './restaurantSide/pages/EditTable&TimeSlot/EditTable&TimeSlot';
import CustomerLogin from './customerSide/pages/auth/CustomerLogin';
import CustomerSignup from './customerSide/pages/auth/CustomerSignup';
import CustomerAuthProvider from './customerSide/context/AuthContext';
import RestaurantDetail from './customerSide/pages/restaurantPage/RestaurantDetail';
import CustomerConfirmationBooking from './customerSide/pages/ConfirmationBooking/CustomerConfirmationBooking';
import CustomerHomepage from './customerSide/pages/HomePage/CustomerHomepage';
import CustomerSuccessfulPage from './customerSide/pages/SuccessfulPage/SucessfulPage';
import './App.css';
import SearchResultPage from './customerSide/pages/SearchResultPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/restaurant/overview" element={<HomePage />} />
            <Route path="/restaurant/history" element={<HistoryPage />} />
            <Route path="/restaurant/edit-profile" element={<SettingsPage />} />
            <Route
              path="/restaurant/forgot-password"
              element={<ForgotPasswordHost />}
            />
            <Route path="/restaurant/login" element={<Login />} />
            <Route path="/restaurant/signup" element={<SignUp />} />
            <Route
              path="/restaurant/edit-tables&timeslots"
              element={<EditTableTimeSlot />}
            />
          </Routes>
        </AuthProvider>
        <CustomerAuthProvider>
          <Routes>
            <Route path="/customer/login" element={<CustomerLogin />} />
            <Route path="/customer/signup" element={<CustomerSignup />} />
            <Route path="/customer/restaurantDetails/:restaurantId" element={<RestaurantDetail />} />
            <Route path='/customer/booking-confirmation'
              element={<CustomerConfirmationBooking />}
            />
            <Route path="/" element={<CustomerHomepage/>} />
            <Route path="/customer/search" element={<SearchResultPage />} />
            <Route path='/customer/successful-page' element={<CustomerSuccessfulPage/>} />
          </Routes>
        </CustomerAuthProvider>     
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
