/* 
 * based on facebook todo
*/

'use strict';

import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';

import Counter from '/Utils/Counter';

import SlideModel from '/Models/SlideModel';
// import SlideActionTypes from '/Dispatcher/SlideActions';
import SlideActionTypes from '/Dispatcher/SlideActionTypes';
import SlideDispatcher from '/Dispatcher/SlideDispatcher';

class SlideStore extends ReduceStore {
  constructor() {
    super(SlideDispatcher);
  }

  getInitialState() {
    return Immutable.OrderedMap();
  }

  reduce(state, action) {
      switch (action.type) {
        case SlideActionTypes.ADD_SLIDE:
          const id = Counter.increment();
          return state.set(id, new SlideModel({
            id,
            text: ''
          }));
      // 
    //   case TodoActionTypes.DELETE_COMPLETED_TODOS:
    //     return state.filter(todo => !todo.complete);
      // 
    //   case TodoActionTypes.DELETE_TODO:
    //     return state.delete(action.id);
      // 
      case SlideActionTypes.EDIT_SLIDE_TEXT:
        return state.setIn([action.id, 'state', ], action.state);
      // 
    //   case TodoActionTypes.TOGGLE_ALL_TODOS:
    //     const areAllComplete = state.every(todo => todo.complete);
    //     return state.map(todo => todo.set('complete', !areAllComplete));
      // 
    //   case TodoActionTypes.TOGGLE_TODO:
    //     return state.update(
    //       action.id,
    //       todo => todo.set('complete', !todo.complete),
    //     );

        default:
          return state;
    }
  }
}

export default new SlideStore();
