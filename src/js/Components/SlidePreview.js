import React from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';
require('../../styles/Partials/SlidePreview.sass')

class SlidePreview extends React.Component {
  constructor(props) {
    super(props);
    this.width = 267;
    this.height = 150;

  }
  
  componentDidMount() {

  }
  
  componentDidUpdate(prevProps, prevState) {
    // TODO: Draw fancy text with formatting
    // TODO: Scale according to template
    
    var rect = new Konva.Rect({
      fill: '#000',
      x: 0,
      y: 0,
      width: this.width,
      height: this.height
    });
    
    var startOffset = this.height;
      
    // TODO: get settings from pro5 template
    var text = new Konva.Text({
      x: 0,
      y: 0,
      text: this.props.slide.text,
      
      width: 267,
      padding: 0,
      align: 'center',
      
      // font
      fontSize: 18,
      fontFamily: 'Helvetica',
      fill: '#fff',
      textDecoration: '',
      fontStyle: ''
    });
    
    var offset = (this.height - text.getHeight())/2;
    text.setY(offset);
    
    this.refs.layer.clear();
    this.refs.layer.add(rect);
    this.refs.layer.add(text);
    this.refs.layer.draw();
    console.log(this.props.slide);
  }
  
  render() {
    return (
      <div className="canvas">
        <Stage width={this.width} height={this.height} >
          <Layer ref="layer">
            <Rect
              x={0} y={0} width={this.width} height={this.height}
              fill={'black'}
            />
          </Layer>
        </Stage>
      </div>  
    );
  }
}

export default SlidePreview;
