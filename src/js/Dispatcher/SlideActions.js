
import SlideActionTypes from '/Dispatcher/SlideActionTypes';
import SlideDispatcher from '/Dispatcher/SlideDispatcher';

const Actions = {
  addSlide() {
    SlideDispatcher.dispatch({
      type: SlideActionTypes.ADD_SLIDE
    });
  },
  
  editSlideText(id, text) {
    if (typeof(text) == 'undefined') {
      text = '';
    }
    SlideDispatcher.dispatch({
      type: SlideActionTypes.EDIT_SLIDE_TEXT,
      id,
      text
    });
  },
  
  editSlideState(id, state) {
    SlideDispatcher.dispatch({
      type: SlideActionTypes.EDIT_SLIDE_STATE,
      id,
      state
    });
  },
};

export default Actions;
