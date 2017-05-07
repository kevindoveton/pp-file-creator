
import SlideActionTypes from '/Dispatcher/SlideActionTypes';
import SlideDispatcher from '/Dispatcher/SlideDispatcher';

const Actions = {
  addSlide() {
    SlideDispatcher.dispatch({
      type: SlideActionTypes.ADD_SLIDE
    });
  },
  
  editSlideText(id, state) {
    SlideDispatcher.dispatch({
      type: SlideActionTypes.EDIT_SLIDE_TEXT,
      id,
      state
    });
  },
};

export default Actions;
