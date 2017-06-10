'use strict';
// import Counter from '/Utils/Counter';
// 
// import SlideModel from '/Models/SlideModel';
import SlideActionTypes from '/Dispatcher/SlideActionTypes';
// import SlideDispatcher from '/Dispatcher/SlideDispatcher';
// 
// class SlideStore extends ReduceStore {
//   constructor() {
//     super(SlideDispatcher);
//   }
// 
//   getInitialState() {
//     return Immutable.OrderedMap();
//   }
// 
//   reduce(state, action) {
//     switch (action.type) {
//       case SlideActionTypes.ADD_SLIDE:
//         const id = Counter.increment();
//         return state.set(id, new SlideModel({
//           id,
//           text: ''
//         }));
// 
//       case SlideActionTypes.EDIT_SLIDE_TEXT:
//         return state.setIn([action.id, 'text', ], action.text);
// 
//       case SlideActionTypes.EDIT_SLIDE_STATE:
//         return state.setIn([action.id, 'state', ], action.state);
// 
//       default:
//         return state;
//     }
//   }
// }
// 
// export default new SlideStore();


export default function reducer(state, action = {}) {
  switch (action.type) {
    case SlideActionTypes.ADD_SLIDE:
      const id = Counter.increment();
      return state.set(id, new SlideModel({
        id,
        text: ''
      }));

    case SlideActionTypes.EDIT_SLIDE_TEXT:
      return state.setIn([action.id, 'text', ], action.text);

    case SlideActionTypes.EDIT_SLIDE_STATE:
      return state.setIn([action.id, 'state', ], action.state);

    default:
      return state;
  }
}

export function slides() {
  return {
    type: 'TYPE'
  }
}
