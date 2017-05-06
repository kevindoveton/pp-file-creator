import React from 'react';
import Slide from '/Components/Slide'

class SlideList extends React.Component {
  constructor(props) {
      super(props)
  }
  
  getSlide(slide) {
    return <Slide key={slide.id}/>
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
