import React from 'react';
import SlideEditor from './SlideEditor'
import SlidePreview from './SlidePreview'

class Slide extends React.Component {
  constructor(props) {
      super(props)
      this.slide = this.props.slide;
  }
  
  componentDidMount() {
    
  }
  
  _newSlide() {
    console.log(this.slide);
  }
  
  render() {
    return (
      <div>
        <SlideEditor slide={this.slide}/>
        <button onMouseDown={this._newSlide}>+</button>
        <button>-</button>
        <SlidePreview />
      </div>
    );
  }
}

export default Slide;
