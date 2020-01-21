import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { State } from 'react-powerplug';
import LazyLoad from 'react-lazyload';
import ProgressiveImage from './ProgressiveImage';
import BubbleLoader from './BubbleLoader';
import Pagination from './Pagination';
import ArrowNavigation from './ArrowNavigation';

const VirtualizeSwipeableViews = virtualize (SwipeableViews);
const MAX_POSSIBLE_MOBILE_SCREEN_HEIGHT = 960;

const BackgroundImage = styled.div`
  width: 100%;
  padding-bottom: ${(props) => 100 / props.ratio}%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: lightgray;
  ${(props) => (props.src ? css`
  background-image: url(${props.src});
  ` : css``)};
  ${({ loading, src }) => ((loading && src)
    ? css`
    filter: blur(8px);
  ` : css`
    filter: blur(0px);
    transition: 300ms filter ease;
  `)
};
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  width: 100%;
  position: absolute;
  z-index: 1;
`;

const Wrapper = styled.div`
  position: relative;
  * {
  box-sizing: border-box;
  }
`;

const AirbnbCarousel = ({
  placeholderUrl, imageUrls, initialIndex, ratio,
}) => {
  const slideCount = imageUrls.length || 0;

  const placeholder = <BackgroundImage src={placeholderUrl || ''} ratio={ratio} />;
  return (
    <LazyLoad once placeholder={placeholder} offset={MAX_POSSIBLE_MOBILE_SCREEN_HEIGHT}>
      <State initial={{ index: initialIndex, loadedIndexes: [0], hover: false }}>
        {({ state, setState }) => (
          <Wrapper>
            <VirtualizeSwipeableViews
              index={state.index}
              // load 6 tiny image to never have blank loading image
              overscanSlideAfter={6}
              overscanSlideBefore={2}
              onChangeIndex={(value) => setState ({
                index: value,
                loadedIndexes: [value, ...state.loadedIndexes],
              })}
              onMouseEnter={() => setState ({ hover: true })}
              onMouseLeave={() => setState ({ hover: false })}
              onTouchStart={() => (state.hover ? setState ({ hover: false }) : undefined)}
              onTouchEnd={() => (state.hover ? setState ({ hover: false }) : undefined)}
              slideCount={slideCount}
              slideRenderer={({ index, key }) => {
                const url = imageUrls[index];

                // No need of a progressive image for index 0 as it is served by ssr
                // this prevents blink
                return (
                  <ProgressiveImage key={key} src={url} placeholder={placeholderUrl || ''}>
                    {(src, loading) => (
                      <Flex>
                        {loading && src && (
                        <Box position="absolute" zIndex={1}>
                          <BubbleLoader loading={loading} color="white" />
                        </Box>
                        )}
                        <BackgroundImage loading={loading} key={key} src={src} ratio={ratio} />
                      </Flex>
                    )}
                  </ProgressiveImage>
                );
              }}
            />

            {imageUrls.length > 1 && state.hover && (
            <ArrowNavigation
              slideCount={slideCount}
              index={state.index || 0}
              onMouseEnter={() => setState ({ hover: true })}
              onMouseLeave={() => setState ({ hover: false })}
              onTouchStart={() => (state.hover ? setState ({ hover: false }) : undefined)}
              onTouchEnd={() => (state.hover ? setState ({ hover: false }) : undefined)}
              onChangeIndex={(value) => {
                setState ({
                  index: value,
                  loadedIndexes: [value, ...state.loadedIndexes],
                });
              }}
            />
            )}
            {imageUrls.length > 1 && (
            <Pagination
              slideCount={slideCount}
              index={state.index || 0}
              onChangeIndex={(value) => setState ({
                index: value,
                loadedIndexes: [value, ...state.loadedIndexes],
              })}
            />
            )}
          </Wrapper>
        )}
      </State>
    </LazyLoad>
  );
};

AirbnbCarousel.propTypes = {
  placeholderUrl: PropTypes.string,
  imageUrls: PropTypes.arrayOf (PropTypes.string).isRequired,
  initialIndex: PropTypes.number,
  ratio: PropTypes.number,
};

AirbnbCarousel.defaultProps = {
  placeholderUrl: '',
  initialIndex: 0,
  ratio: 4 / 3,
};

export default AirbnbCarousel;
