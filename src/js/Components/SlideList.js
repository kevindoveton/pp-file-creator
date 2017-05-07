import React from 'react';
import Slide from '/Components/Slide'

class SlideList extends React.Component {
  constructor(props) {
      super(props)
  }
  
  componentDidMount() {
    this.props.AddSlide();
  }
  
  getSlide(slide) {
    return <Slide key={slide.id} slide={slide}{...this.props} />
  }
  
  createSlide() {
    var content = this.props.slides.map(slide => this.getSlide(slide));
    return <div>{content}</div>;
  }
  
  render() {
    return this.createSlide();
	}
}

export default SlideList;
