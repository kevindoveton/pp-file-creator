import React, { PropTypes, Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


import AppContainer from '/Containers/AppContainer'

class Routes extends Component {

  getAddress() {
    return (
      <h1>We are located at 555 Jackson St.</h1>
    );
  }
  
  // TODO: Make a prettier 404
  get404() {
    return (
      <h1>Route Not Found</h1>
    );
  }

  render() {
    const NotFound = () => (<h1>404.. This page is not found!</h1>);

    return (
      <Router>
        <div>
          <Route exact path='/' component={AppContainer} />
          <Route path='/address' component={() => this.getAddress()} />
          <Route path='*' component={() => this.get404()} />
        </div>
      </Router>
    );
  }
}

export default Routes;
