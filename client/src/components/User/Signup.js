import React from 'react';
import Axios from '../../Axios';

class Signup extends React.Component {
  state = {
    username: '',
    password: '',
    length: 4,
    message: ''
  };

  usernameHandler = event => {
    let username = event.target.value;
    this.setState({
      username: username
    });
  };

  passwordHandler = event => {
    let password = event.target.value;
    this.setState({
      password: password
    });
  };

  signUpBtnHandler = event => {
    event.preventDefault();
    if (
      this.state.username.length > this.state.length &&
      this.state.password.length > this.state.length
    ) {
      const user = {
        username: this.state.username,
        password: this.state.password
      };
      Axios.post('/user/signup', user)
        .then(response => {
          this.setState({
            message: response.data.message
          });
        })
        .catch(error => {
          this.setState({
            message: error.message
          });
        });
    }
  };

  loginBtnHandler = event => {
    event.preventDefault();

    window.location = 'login';
  };

  render = () => {
    return (
      <div className="shadow conatiner rounded">
        <br />
        <div className="display-4">Signup</div>
        <div className="text-primary">
          <br />
          Minimum {this.state.length + 1} characters required for Username &
          Password
          <br />
          <br />
        </div>
        <div className="text-primary">
          <br />
          {this.state.message === '' ? null : this.state.message}
          <br />
          <br />
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="inputusername">Username</label>
            <input
              required
              type="text"
              className="form-control"
              id="inputusername"
              placeholder="Username"
              value={this.state.username}
              onChange={this.usernameHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input
              required
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Password"
              value={this.state.password}
              onChange={this.passwordHandler}
            />
          </div>{' '}
          <br />
          <button
            type="submit"
            className="btn btn-success"
            onClick={this.signUpBtnHandler}
          >
            Sign up
          </button>
          <br />
          <br />
          <br />
          <div className="form-group">
            <label>Already have a profile?</label>
            <br />
            <button className="btn btn-primary" onClick={this.loginBtnHandler}>
              Login
            </button>
            <br />
          </div>
        </form>
      </div>
    );
  };
}

export default Signup;
