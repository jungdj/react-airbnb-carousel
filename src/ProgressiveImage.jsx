import * as React from 'react';

export default class ProgressiveImage extends React.Component {
  image;

  timer;

  constructor (props) {
    super (props);
    this.state = {
      image: '',
      loading: true,
    };
  }

  componentDidMount () {
    const { src, placeholder } = this.props;
    this.loadImageFromCache (src, placeholder);
  }

  componentDidUpdate (prevProps) {
    const { src, placeholder } = this.props;
    // We only invalidate the current image if the src has changed.
    if (src !== prevProps.src) {
      this.loadImageFromCache (src, placeholder);
    }
  }

  componentWillUnmount () {
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }
    clearTimeout (this.timer);
  }

  loadImageFromCache = (src, placeholder) => {
    if (src) {
      this.loadImage (src);

      this.timer = setTimeout (() => {
        if (this.state.image !== src) {
          this.setState ({ image: placeholder, loading: true });
        }
      }, 100);
    }
  };

  loadImage = (src) => {
    // If there is already an image we nullify the onload
    // and onerror props so it does not incorrectly set state
    // when it resolves
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }
    const image = new Image ();
    this.image = image;
    image.onload = this.onLoad;
    image.onerror = this.onError;
    image.src = src;
  };

  onLoad = () => {
    // use this.image.src instead of this.props.src to
    // avoid the possibility of props being updated and the
    // new image loading before the new props are available as
    // this.props.
    this.setState ({
      image: this.image.src,
      loading: false,
    });
  };

  onError = (errorEvent) => {
    const { onError } = this.props;
    if (onError) {
      onError (errorEvent);
    }
  };

  render () {
    const { image, loading } = this.state;
    const { children } = this.props;

    return React.Children.only (children (image, loading));
  }
}
