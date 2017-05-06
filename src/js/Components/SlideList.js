import React from 'react';
import Slide from '/Components/Slide'

class SlideList extends React.Component {
  constructor(props) {
      super(props)
  }
  
  componentDidMount() {
  }
  
  getSlide(slide) {
    return <Slide key={slide.id}/>
  }
  
  createSlide() {
    var content = this.props.slides.map(slide => this.getSlide(slide));
    return <div>{content}</div>;
  }
  
  render() {
    // return this.createSlide();
    return <div><Slide /></div>
	}
}

export default SlideList;
