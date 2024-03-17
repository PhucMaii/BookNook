import { Avatar, LinearProgress } from '@mui/material';
import styled from 'styled-components';
import { primary, primary15 } from '../../../theme/colors';

export const StyledAvatar = styled(Avatar)`
  background-color: ${primary15} !important;
  width: 56px !important;
  height: 56px !important;
`;

export const iconStyled = { color: primary, width: 30, height: 30 };

export const ProgressStyled = styled(LinearProgress)`
  width: 100%;
  height: 15px !important;
  border-radius: 5px;
`;
