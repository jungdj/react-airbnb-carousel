import React from 'react';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import PaginationDot from './PaginationDot';

const styles = {
  slideContainer: {
    width: '18px',
    height: '18px',
  },
};

const PaginationWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 8px;
  right: 8px;
  left: 8px;
`;

const Pagination = ({ index, slideCount, onChangeIndex }) => {
  const children = [];

  for (let i = 0; i < slideCount; i += 1) {
    // Make pagination dot smaller if it is at extermities and there are more images to show after
    let moreState = false;

    // Case where index is small that 3
    if (i === 6 && index < 4 && slideCount > 7) {
      moreState = true;
      // Case where index is larger than the number of slide -1
    } else if (
      i === slideCount - 7
      && index > slideCount - 5
      && slideCount > 7
    ) {
      moreState = true;
      // General case
    } else if (
      (i > 4 || i < slideCount - 5)
      && index > 3
      && index < slideCount - 4
      && (index >= i + 3 || index <= i - 3)
    ) {
      moreState = true;
    }

    children.push (
      <PaginationDot
        key={i}
        index={i}
        active={i === index}
        moreState={moreState}
        onClick={(event, newIndex) => onChangeIndex (newIndex)}
      />,
    );
  }

  const numberOfDots = slideCount > 7 ? 7 : slideCount;
  let sliderPadding = (numberOfDots - 1) / 2;

  let fixedIndex = index;
  if (index < 3) {
    fixedIndex = 3;
  } else if (index > slideCount - 4) {
    fixedIndex = slideCount - 4;
  }

  if (slideCount < 8) {
    fixedIndex = 0;
    sliderPadding = (7 - slideCount) / 2;
  }

  return (
    <PaginationWrapper>
      <SwipeableViews
        index={fixedIndex}
        style={{
          width: '126px',
          padding: `0px ${sliderPadding * 18}px`,
        }}
        slideStyle={styles.slideContainer}
        disabled
      >
        {children}
      </SwipeableViews>
    </PaginationWrapper>
  );
};

export default Pagination;
