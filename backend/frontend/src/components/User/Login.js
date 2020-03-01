import React from 'react';
import Axios from '../../Axios';
let Token = {
  value: ''
};
class Login extends React.Component {
  state = {
    username: '',
    password: '',
    length: 4,
    message: '',
    token: ''
  };
  signUpBtnHandler = (event) => {
    event.preventDefault();
    window.location = 'signup';
  };

  loginBtnHandler = event => {
    event.preventDefault();
    if (
      this.state.username.length > this.state.length &&
      this.state.password.length > this.state.length
    ) {
      const user = {
        username: this.state.username,
        password: this.state.password
      };
      Axios.post('/user/login', user)
        .then(response => {
          console.log(response);
          console.log(response.data.token);
          this.setState({
            message: response.data.message,
            token: response.data.token
          });
          Token.value = this.state.token;
        })
        .catch(error => {
          this.setState({
            message: error.message
          });
        });
    }
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

  render = () => {
    return (
      <div
        className="shadow conatiner rounded"
        style={{ margin: '10rem', padding: '5rem' }}
      >
        <br />
        <div className="display-4">Login</div>
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
          <button
            type="submit"
            className="btn btn-success"
            onClick={this.loginBtnHandler}
          >
            Login
          </button>
          <br />
          <br />
          <br />
          <div className="form-group">
            <label htmlFor="">Don't have a profile?</label>
            <br />
            <button className="btn btn-primary" onClick={this.signUpBtnHandler}>
              Sign up
            </button>
            <br />
          </div>
        </form>
      </div>
    );
  };
}

export { Login, Token };
