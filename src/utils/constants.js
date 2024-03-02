import PieChartOutlinedIcon from '@mui/icons-material/PieChartOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ReviewsRoundedIcon from '@mui/icons-material/ReviewsRounded';

export const drawerWidth = 300;

export const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const upperTabs = [
  {
    name: 'Overview',
    path: '/restaurant/overview',
    icon: GridViewOutlinedIcon,
  },
  {
    name: 'History',
    path: '/restaurant/history',
    icon: PieChartOutlinedIcon,
  },
  {
    name: 'Reviews',
    path: '/restaurant/reviews',
    icon: ReviewsRoundedIcon,
  },
];

export const lowerTabs = [
  {
    name: 'Restaurant',
    path: '/restaurant/edit-tables&timeslots',
  },
  {
    name: 'Profile',
    path: '/restaurant/edit-profile',
  },
];

export const restaurantTypes = [
  'Asian',
  'Chinese',
  'Japanese',
  'Vietnamese',
  'Indian',
  'Italian',
  'French',
  'FastFood',
  'Other',
];

export const averagePrices = [
  'Less than $25',
  '$25 - $50',
  '$50 - $100',
  '$100 - $200',
  'Greater than $200',
];

export const timeSelect = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 AM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
  '9:00 PM',
];

export const tableTypes = [
  'Rooftop',
  'Counter',
  'Standard',
  'Indoor',
  'Outdoor',
  'Bar',
  'Window Seat',
  'Other',
];

export const cardContent = [
  {
    img: '/Reservation.png',
    title: 'Total Reservations',
    data: 75,
  },
  {
    img: '/Arrive.png',
    title: 'Total Arrived',
    data: 50,
  },
  {
    img: '/Review.png',
    title: 'Avg Review Stars',
    data: 4.2,
  },
];

export const guestSelect = [1, 2, 3, 4, 5, 6, 7, 8, 9];
