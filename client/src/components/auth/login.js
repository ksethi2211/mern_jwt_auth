import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap';

class Login extends Component {
  state = {
    email: '',
    password: '',
    msg: null
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      }
      else {
        this.setState({ msg: null })
      }
    }

    if (isAuthenticated) {
      this.props.history.push('/home')
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault();

    //Clear Errors
    this.props.clearErrors();

    const { name, email, password } = this.state;

    //Create user object
    const newUser = {
      name,
      email,
      password
    }

    //Attempt to Login
    this.props.login(newUser);
  }

  render() {
    return (
      <div className="container">
        <h3>Login</h3>

        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for='email'>Email</Label>
            <Input
              type='email'
              name='email'
              id='email'
              placeholder='Email'
              className='mb-3'
              onChange={this.onChange}
            />

            <Label for='password'>Password</Label>
            <Input
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              className='mb-3'
              onChange={this.onChange}
            />
            <Button color='dark' style={{ marginTop: '2rem' }} block>
              Login
            </Button><br />
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
          </FormGroup>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(Login)
