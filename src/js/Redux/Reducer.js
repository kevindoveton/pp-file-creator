'use strict'

import { combineReducers } from 'redux';

// Import the individual reducers from their respective modules:
import Slides from './Slides';

// Using the ES6 object literal shorthand assignment combine them
// to create the store:
export default combineReducers({
  Slides
});
