/* 
 * based on facebook todo
*/

'use strict';

import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';

import Counter from '/Utils/Counter';

import SlideModel from '/Models/SlideModel';
import SlideActions from '/Dispatcher/SlideActions';
import SlideDispatcher from '/Dispatcher/SlideDispatcher';

class SlideStore extends ReduceStore {
  constructor() {
    super(SlideDispatcher);
  }

  getInitialState() {
    return Immutable.OrderedMap();
  }

  reduce(state, action) {
      console.log(action)
      switch (action.type) {
        // case SlideActions.ADD_TODO:
        //   // Don't add todos with no text.
        //   if (!action.text) {
        //     return state;
        //   }
        //   const id = Counter.increment();
        //   return state.set(id, new Todo({
        //     id,
        //     text: action.text,
        //     complete: false,
        //   }));
      // 
    //   case TodoActionTypes.DELETE_COMPLETED_TODOS:
    //     return state.filter(todo => !todo.complete);
      // 
    //   case TodoActionTypes.DELETE_TODO:
    //     return state.delete(action.id);
      // 
    //   case TodoActionTypes.EDIT_TODO:
    //     return state.setIn([action.id, 'text'], action.text);
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
