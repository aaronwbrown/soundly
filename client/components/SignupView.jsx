// get username
// get user email
// get user password
// store in user variable, and pass to db

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import $ from 'jquery';


export default class SignupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'info',
      message: '',
    };
  }

  handleSignup(e) {
    e.preventDefault();
    this.setState({ type: 'info', message: 'Sending...' }, this.sendFormData);
  }

  sendFormData() {
    const formData = {
      username: this.refs.username.value,
      password: this.refs.password.value,
    };
    // send data
    $.ajax({
      url: '/api/users/signup',
      contentType: 'application/x-www-form-urlencoded',
      type: 'POST',
      data: formData,
      success: function(result) {
        console.log('result', result);
        Router.replace('/main');
      },
      error: function(xhr, status, err) {
        console.error(status, err.toString());
        this.setState({ type: 'info', message: err.toString() });
      },
    });
  }

  render() {
    return (
      <div>
        <h1 id="heading">Signup!</h1>
        <h2>{this.state.message}</h2>
        <form onSubmit={this.handleSignup.bind(this)}>
          <div className="form-group">
            <label htmlFor="username">Select a username</label>
            <input className="form-control" name="username" ref="username" required type="text"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Select a password</label>
            <input className="form-control" name="password" ref="password" required type="text"/>
          </div>
          <div className="form-group">
            <button>submit</button>
          </div>
        </form>
      </div>
    );
  }
}
