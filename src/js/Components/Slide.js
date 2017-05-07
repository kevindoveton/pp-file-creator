import React from 'react';
import SlideEditor from './SlideEditor'
import SlidePreview from './SlidePreview'

class Slide extends React.Component {
  constructor(props) {
      super(props)
      
      this.slide = this.props.slide;
      this.id = this.slide.id;

  }
  
  componentDidMount() {
  }
  
  _newSlide() {

  }
  
  render() {
    return (
      <div>
        <SlideEditor {...this.props} />
        <button onMouseDown={this._newSlide}>+</button>
        <button>-</button>
        <SlidePreview {...this.props} />
      </div>
    );
  }
}

export default Slide;
