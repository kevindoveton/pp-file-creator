// react
import React from 'react';
import ReactDOM from 'react-dom';

// app
import AppContainer from '/Containers/AppContainer'

// css
require('../styles/main.sass')

ReactDOM.render(
  <AppContainer />,
  document.querySelector('#react-mount')
);
