import React from 'react';
import SlideEditor from './SlideEditor'
import SlidePreview from './SlidePreview'

class Slide extends React.Component {
  constructor(props) {
      super(props)
  }
  
  _newSlide() {
    
  }
  
  render() {
    return (
      <div>
        <SlideEditor />
        <button onMouseDown={this._newSlide}>+</button>
        <button>-</button>
      </div>
    );
  }
}

export default Slide;
