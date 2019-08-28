import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class Logout extends Component {

  handleLogout() {
    this.props.logout();
    console.log(this.props);
    this.props.history.push('/register')
  }

  static propTypes = {
    logout: PropTypes.func.isRequired
  }


  render() {
    return (
      <Fragment>
        <button onClick={this.handleLogout.bind(this)}>
          Logout
        </button>
      </Fragment>
    )
  }
}

export default withRouter(connect(null, { logout })(Logout));