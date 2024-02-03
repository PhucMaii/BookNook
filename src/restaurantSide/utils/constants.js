import PieChartOutlinedIcon from '@mui/icons-material/PieChartOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ReviewsRoundedIcon from '@mui/icons-material/ReviewsRounded';

export const drawerWidth = 300;

export const upperTabs = [
    {
      name: 'Overview',
      path: '/overview',
      icon: GridViewOutlinedIcon,
    },
    {
      name: 'History',
      path: '/history',
      icon: PieChartOutlinedIcon,
    },
    {
      name: 'Reviews',
      path: '/reviews',
      icon: ReviewsRoundedIcon,
    },
];
  
export const lowerTabs = [
    {
      name: 'Restaurant',
      path: '/restaurant',
    },
    {
      name: 'Profile',
      path: '/hostProfile',
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