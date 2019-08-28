import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { loadUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import Register from './components/auth/register';
import Login from './components/auth/login'
import Home from './components/home';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/home' component={Home} />
        </Router>
      </Provider>
    )
  }
}

export default App