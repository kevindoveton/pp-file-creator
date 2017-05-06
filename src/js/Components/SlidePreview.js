import React from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';


class SlidePreview extends React.Component {
  constructor(props) {
    super(props);

  }
  
  
  render() {
    return (
      <Stage width={160} height={90} style={{display: 'inline-block'}}>
        <Layer>
          <Rect
            x={0} y={0} width={160} height={90}
            fill={'green'}
          />
        </Layer>
      </Stage>
    );
  }
}

export default SlidePreview;
