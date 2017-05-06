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
    
  };
}

export default Container.createFunctional(AppView, getStores, getState);
