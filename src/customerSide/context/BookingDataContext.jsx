import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const BookingDataContext = createContext();

export default function BookingDataProvider({children}) {
    const [bookingData, setBookingData] = useState({});
  return (
    <BookingDataContext.Provider value={{bookingData, setBookingData}}>
        {children}
    </BookingDataContext.Provider>
  )
}

BookingDataProvider.propTypes = {
    children: PropTypes.node
}
