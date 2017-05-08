// react
import React from 'react';
import ReactDOM from 'react-dom';

// app
import Routes from '/Views/Routes'

// css
require('../styles/main.sass')

ReactDOM.render(
  <Routes />,
  document.querySelector('#react-mount')
);
