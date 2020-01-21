import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  height: 18px;
  width: 18px;
  cursor: pointer;
  border: 0;
  background: none;
  padding: 0;
  :focus {
    outline: 0;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyleDot = styled.div`
  background-color: white;
  opacity: ${({ active }) => (active ? '1' : '0.6')};
  height: ${({ active, moreState }) => (active ? '8px' : moreState ? '4px' : '6px')};
  width: ${({ active, moreState }) => (active ? '8px' : moreState ? '4px' : '6px')};
  border-radius: ${({ active }) => (active ? '4px' : '3px')};
`;

const PaginationDot = ({
  active, index, moreState, onClick,
}) => (
  <Button onClick={(event) => onClick (event, index)}>
    <StyleDot active={active} moreState={moreState} />
  </Button>
);

export default PaginationDot;
