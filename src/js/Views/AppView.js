import React from 'react';
import SlideList from '/Components/SlideList';
import Dispatcher from '/Dispatcher/SlideDispatcher';


function AppView(props) {

  return (
    <div>
      <button onClick={props.AddSlide}>Add</button>
      <SlideList {...props}/>
    </div>
  );
}

export default AppView;
