import React, { Component } from 'react';

import {
	Switch,
	Route,
	Redirect
} from 'react-router-dom';

import Home from './Home';
import Dashboard from './Dashboard';

class App extends Component {
  render() {
    return (
      <div>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/dashboard' component={Dashboard} />
					<Redirect path='/*' to='/' />
				</Switch>
			</div>
    );
  }
}

export default App;
