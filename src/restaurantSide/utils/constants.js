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

export const tableContent = [
  {
    customerName: 'Jane Cooper',
    tableName: 'Table 2',
    time: '9:00AM',
    status: 'seated',
  },
  {
    customerName: 'Wade Warren',
    tableName: 'Table 3',
    time: '10:00AM',
    status: 'Confirmed',
  },
  {
    customerName: 'Esther Howard',
    tableName: 'Table 1',
    time: '11:00AM',
    status: 'Unconfirmed',
  },
];

export const timeSlots = [
  '9:00 AM',
  '9:30 AM'
]