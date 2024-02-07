import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import styled from 'styled-components';

export const IconImg = styled.img`
  width: 50px;
  height: 50px;
`;

export const StatusTabStyled = styled(Box)`
  background-color: ${(props) => props.$isCurrentTab ? grey[400] : grey[200]};
  border-radius: 20px;
  cursor: pointer;
`;