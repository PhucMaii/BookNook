import { ListItemButton } from '@mui/material';
import styled from 'styled-components';
import { blueGrey } from '../../../theme/colors';

export const ListItemButtonStyled = styled(ListItemButton)`
  margin: auto !important;
  width: 80%;
  background-color: ${(props) => props.$currentTab && `${blueGrey} !important`};
`;