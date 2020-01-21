import React from 'react';
import Bubble from './Bubble';

const BubbleLoader = (props) => <Bubble {...props} />;

BubbleLoader.defaultProps = {
  loading: true,
  color: '#9e9e9e',
  duration: 1.2,
  size: 6,
  opacity: 0.5,
};

export default BubbleLoader;
