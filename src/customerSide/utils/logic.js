import { where } from 'firebase/firestore';
import { fetchData, fetchDoc } from '../../utils/firebase';
import { daysOfWeek } from '../../utils/constants';

export const checkIsRestaurantOpenToday = async (restaurant, today) => {
  try {
    const restaurantClosedDays = await fetchData(
      'closedDays',
      where('restaurantId', '==', restaurant.id)
    );

    if (restaurantClosedDays.length === 0) {
      return false;
    }
    
    return !restaurantClosedDays[0].closedDays.includes(today);
  } catch (error) {
    console.log('Fail to check restaurant available: ', error);
  }
};

export const checkIsRestaurantOpenCurrently = async (
  restaurant,
  currentHour
) => {
  try {
    const restaurantDoc = await fetchDoc('restaurants', restaurant.id);
    const restaurantData = restaurantDoc.docData;

    const openTime = parseInt(restaurantData.openTime.split(':').join(''));
    const closeTime = parseInt(restaurantData.closeTime.split(':').join(''));

    return currentHour >= openTime && currentHour < closeTime;
  } catch (error) {
    console.log('Fail to check is restaurant open: ', error);
  }
};

export const checkRestaurantHasTable = async (restaurant, currentHour) => {
  // check 2 hours before and 2 hours after to get time slots range in between 1 hour
  const startRangeHour = currentHour - 200;
  const endRangeHour = currentHour + 200;
  try {
    const restaurantTables = await fetchData(
      'diningTables',
      where('restaurantId', '==', restaurant.id)
    );

    if (restaurantTables.length === 0) {
      return false;
    }

    const restaurantReservations = await fetchData(
      'reservations',
      where('restaurantId', '==', restaurant.id)
    );

    const reservationsInRange = restaurantReservations.filter((reservation) => {
      let reservationTime = 0;
      const reservationDate = reservation.date.toDate();
      reservationTime += reservationDate.getHours() * 100;
      reservationTime += reservationDate.getMinutes();
      return reservationTime > startRangeHour && reservationTime < endRangeHour;
    });

    if (reservationsInRange.length > 0) {
      const unavailableTables = reservationsInRange.map((reservation) => {
        return reservation.tableId;
      });
      const availableTables = restaurantTables.filter(
        (table) => !unavailableTables.includes(table.id)
      );
      return availableTables.length > 0;
    }

    return true;
  } catch (error) {
    console.log('Fail to check restaurant has table: ', error);
  }
};

export const checkIsRestaurantAvailable = async (restaurant) => {
  const currentDate = new Date();
  const today = daysOfWeek[currentDate.getDay()];
  // Convert the hour to 4 digits number
  const currentHour = currentDate.getHours() * 100 + currentDate.getMinutes();

  try {
    const isRestaurantAvailableToday = await checkIsRestaurantOpenToday(
      restaurant,
      today
    );

    if (!isRestaurantAvailableToday) {
      return false;
    }

    const isRestaurantOpen = await checkIsRestaurantOpenCurrently(
      restaurant,
      currentHour
    );

    if (!isRestaurantOpen) {
      return false;
    }

    const isRestaurantHasTables = await checkRestaurantHasTable(
      restaurant,
      currentHour
    );

    return isRestaurantHasTables;
  } catch (error) {
    console.log('Fail to check restaurant availability: ', error);
  }
};
