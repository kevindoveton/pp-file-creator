
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
    return <Slide key={slide.id} slide={slide} {...this.props} />
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

/*
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'react/lib/update';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Slide from '/Components/Slide'

const style = {
  width: 400,
};

const cardTarget = {
  drop() {
  },
};

@DragDropContext(HTML5Backend)
@DropTarget('slide', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))

class SlideList extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.findCard = this.findCard.bind(this);
    this.state = {
      slides: this.props.slides
    };
  }
  
  componentDidMount() {
    this.props.AddSlide();
  }

  moveCard(id, atIndex) {
    const { slide, index } = this.findCard(id);
    
  }

  findCard(id) {
    const { slides } = this.state;
    const slide = slides.filter(slide => {
      return slide.id === id
    })[0];

    return {
      slide,
      index: slides.valueSeq().indexOf(slide),
    };
  }

  render() {
    const { connectDropTarget } = this.props;
    const { slides } = this.state;

    return connectDropTarget(
      <div style={style}>
        {this.props.slides.valueSeq().map(slide => (
          <Slide
            key={slide.id}
            id={slide.id}
            slide={slide}
            moveCard={this.moveCard}
            findCard={this.findCard}
            {...this.props}
          />
        ))}
      </div>,
    );
  }
}

export default SlideList;
*/
