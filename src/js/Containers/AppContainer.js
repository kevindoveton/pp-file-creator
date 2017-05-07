'use strict';

// flux
import {Container} from 'flux/utils';

// app
import AppView from '/Views/AppView';
import SlideActions from '/Dispatcher/SlideActions';
import SlideStore from '/Store/SlidesStore';

function getStores() {
  return [
    SlideStore
  ];
}

function getState() {
  return {
    slides: SlideStore.getState(),
    onAddSlide: SlideActions.addSlide
  };
}

export default Container.createFunctional(AppView, getStores, getState);
