import React from 'react';
import SlideList from '/Components/SlideList';
import Dispatcher from '/Dispatcher/SlideDispatcher';
// 
// var slides = [{
//   id: 1
// },
// {
//   id: 2
// }];
// 
// class AppView extends React.Component {
//   constructor(props) {
//       super(props)
//       this.state = {
//         slides: slides
//       }
//       
//         // setTimeout(()=>{
//         //   var a = this.state;
//         //   console.log(a);
//         //   a.slides.push({id:3});
//         //   this.setState(a);
//         // },3000)
//   }
// 
// 
//   render() {
//     return (
//       <div>
//         <SlideList slides={this.state.slides}/>
//       </div>
//     );
//   }
// }


function AppView(props) {

  return (
    <div>
      <button onClick={props.onAddSlide}>Add</button>
      <SlideList {...props}/>
    </div>
  );
}

export default AppView;
