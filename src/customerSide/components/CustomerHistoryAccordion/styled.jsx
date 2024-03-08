import styled from 'styled-components';

const AccordionPingStyled = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.$isCompleted ? 'success' : 'error')};
`;

const AccordionContainerStyled = styled.div`
  margin: 5px 0; 
  border-radius: 8px; 
  border: 0px solid #ccc; 
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const AccordionCardStyled = styled.div`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 8px; 
`;

const AccordionCardContentStyled = styled.div`
  padding: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: flex;
  justify-content: flex-end;
  margin: 10px;

  & > * {
    margin-right: 50px;
  }
`;

const AccordionContentWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  span {
    color: green,
    fontSize: 1.2em,
    margin-right: 1px; 
  }

  strong {
    flex: 0 0 140px;
    margin-right: 1px;
  }

  span,
  strong {
    flex: 1;
  }
`;

const iconStyles = {
  color: 'green',
  fontSize: '1.2em',
  marginRight: '1px', 
};

export {
  AccordionPingStyled,
  AccordionContainerStyled,
  AccordionCardStyled,
  AccordionCardContentStyled,
  AccordionContentWrapper,
  iconStyles,
};
