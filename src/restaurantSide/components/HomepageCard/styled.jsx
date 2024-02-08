import { Card } from '@mui/material';
import styled from 'styled-components';

export const CardStyled = styled(Card)`
    border-radius: 14px; 
    max-width: 100%; 
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`

export const IconBackground = styled.div`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  background-color: rgba(52, 152, 219, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-bottom: 16px;
`;
