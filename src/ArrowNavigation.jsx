import React from 'react';
import styled, { css } from 'styled-components';

const RightStyle = css`
  right: 0;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
`;
const LeftStyle = css`
  left: 0;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(255, 255, 255, 0) 100%
  );
`;
const NavigationButton = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  position: absolute;
  bottom: 0;
  top: 0;
  width: 25%;
  max-width: 100px;
  cursor: pointer;
  ${(props) => (props.left ? LeftStyle : RightStyle)};
`;

const ArrowNavigation = ({
  onChangeIndex,
  index,
  slideCount,
  onMouseLeave,
  onMouseEnter,
  onTouchStart,
  onTouchEnd,
}) => [
  <NavigationButton
    key="next-nav"
    onClick={() => (slideCount - 1 > index ? onChangeIndex (index + 1) : onChangeIndex (0))}
    onMouseLeave={onMouseLeave}
    onMouseEnter={onMouseEnter}
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
  >
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" role="img" fill="currentColor" color="white">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  </NavigationButton>,
  <NavigationButton
    key="before-nav"
    width={[1 / 4]}
    onClick={() => (index > 0 ? onChangeIndex (index - 1) : onChangeIndex (slideCount - 1))}
    onMouseLeave={onMouseLeave}
    onMouseEnter={onMouseEnter}
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
    left
  >
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" role="img" fill="currentColor" color="white">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  </NavigationButton>,
];

export default ArrowNavigation;
