import React from 'react';

class ProgressiveImage extends React.Component {
    state = {
      currentImage: this.props.preview,
      loading: true,
    }
  
    componentDidMount() {
      this.fetchImage(this.props.image);
    }
  
    componentWillReceiveProps(nextProps) {
      if (nextProps.image !== this.props.image) {
        this.setState({ currentImage: nextProps.preview, loading: true }, () => {
          this.fetchImage(nextProps.image);
        })
      }
    }
  
    componentWillUnmount() {
      if (this.loadingImage) {
        this.loadingImage.onload = null;
      }
    }
  
    fetchImage = src => {
      const image = new Image();
      image.onload = () => this.setState({ currentImage: this.loadingImage.src, loading: false });
      image.src = src;
      this.loadingImage = image;
    }
  
    style = loading => {
      return {
        transition: '0.5s filter linear',
        filter: `${loading ? 'blur(15px)' : ''}`,
      }
    }
  
    render() {
      const { currentImage, loading } = this.state;
      const { alt } = this.props;
      return (
        <img className="article-image intrinsic-item" srcSet={currentImage} alt={alt} style={this.style(loading)} />
      )
    }
  }

  export default ProgressiveImage;