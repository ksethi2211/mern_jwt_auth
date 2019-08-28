import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    msg: null
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === 'REGISTER_FAIL') {
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

    //Attempt to Register
    this.props.register(newUser);
  }

  render() {
    return (
      <div className="container">
        <h3>Register</h3>

        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for='name'>Name</Label>
            <Input
              type='text'
              name='name'
              id='name'
              placeholder='Name'
              className='mb-3'
              onChange={this.onChange}
            />

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
              Register
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
  { register, clearErrors }
)(Register)
