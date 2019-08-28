import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Logout from "./auth/logout";
import { withRouter } from "react-router";

export class Home extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) this.props.history.push("/register");
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div>
        <h4>{user ? `Welcome, ${user.name}` : `You are not authorized`}</h4>
        {/* {isAuthenticated ? <div /> : <div />} */}
        <br />
        <Logout />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Home)
);
