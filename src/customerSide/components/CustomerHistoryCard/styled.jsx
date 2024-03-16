import { Card } from '@mui/material';
import styled from 'styled-components';

export const CardStyled = styled(Card)`
    border-radius: 50%;
    max-width: 100%; 
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    height: 90px;
    width: 250px;
    padding: 20px;
    color: rgba(0, 0, 0, 0.6); 
`;

export const IconBackground = styled.div`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  background-color: rgba(255, 182, 193, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-bottom: 16px;
`;
