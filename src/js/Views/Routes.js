import React, { PropTypes, Component } from 'react';

// import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, Switch } from 'react-router'
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

  render() {
    const NotFound = () => (<h1>404.. This page is not found!</h1>);

    return (
      <Router>
        <div>
          <Route exact path='/' component={AppContainer} />
          <Route path='/address' component={() => this.getAddress()} />
        </div>
      </Router>
    );
  }
}

export default Routes;
