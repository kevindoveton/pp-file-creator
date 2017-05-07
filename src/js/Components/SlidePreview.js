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
    var text = new Konva.Text({
      x: 0,
      y: 0,
      text: 'Excepteur nulla ullamco et exercitation do anim et excepteur in culpa irure non nostrud cillum ullamco dolor magna.',
      
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
    
    this.refs.layer.add(text)
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
