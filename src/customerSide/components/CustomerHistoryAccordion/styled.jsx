import styled from 'styled-components';
import { error, success } from '../../../theme/colors';

export const PingStyled = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.$isCompleted ? success : error)};
`;


