
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

/*
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';

import SlideEditor from './SlideEditor'
import SlidePreview from './SlidePreview'


const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.findCard(props.id).index,
    };
  },

  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveCard(droppedId, originalIndex);
    }
  },
};

const cardTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.findCard(overId);
      props.moveCard(draggedId, overIndex);
    }
  },
};

@DropTarget('slide', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource('slide', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))

class Slide extends Component {
  constructor(props) {
    super(props);
    
    this.slide = this.props.slide;
    this.id = this.slide.id;
  }
  
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    moveCard: PropTypes.func.isRequired,
    findCard: PropTypes.func.isRequired,
  };

  render() {
    const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(
      <div>
        <SlideEditor {...this.props} />
        <button onMouseDown={this._newSlide}>+</button>
        <button>-</button>
        <SlidePreview {...this.props} />
      </div>
    ));
  }
}

export default Slide;
*/
