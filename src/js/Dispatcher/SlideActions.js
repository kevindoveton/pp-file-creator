
import SlideActionTypes from '/Dispatcher/SlideActionTypes';
import SlideDispatcher from '/Dispatcher/SlideDispatcher';

const Actions = {
  addSlide() {
    SlideDispatcher.dispatch({
      type: SlideActionTypes.ADD_SLIDE
    });
  },
};

export default Actions;
