import React from 'react';
import Axios from '../../Axios';
import { Link, Redirect } from 'react-router-dom';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    length: 4,
    message: '',
    token: '',
    user: ''
  };
  signUpBtnHandler = event => {
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
          this.setState({
            message: response.data.message,
            token: response.data.token,
            user: response.data.user
          });
          Axios.defaults.headers.common['Authorization'] =
            'Bearer ' + response.data.token;
          Axios.defaults.headers.common['User'] = 'User ' + response.data.user;
          Axios.defaults.headers.common['Username'] =
            'Username ' + this.state.username;
          this.forceUpdate();
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
      <div className="container rounded">
        {Axios.defaults.headers.common['User'] &&
        Axios.defaults.headers.common['Authorization'] ? (
          Axios.defaults.headers.common['User'].split(' ')[1] &&
          Axios.defaults.headers.common['Authorization'].split(' ')[1] ? (
            <Redirect
              to={
                '/users/profile/' +
                Axios.defaults.headers.common['Username'].split(' ')[1]
              }
            ></Redirect>
          ) : (
            <div>
              <br />
              <div className="display-4">Login</div>
              <div className="text-primary">
                <br />
                Minimum {this.state.length + 1} characters required for Username
                & Password
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
                </div>
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={this.loginBtnHandler}
                >
                  <Link to="/profile" className="text text-white">
                    Login
                  </Link>
                </button>
                <br />
                <br />
                <br />
                <div className="form-group">
                  <label htmlFor="">Don't have a profile?</label>
                  <br />
                  <button
                    className="btn btn-primary"
                    onClick={this.signUpBtnHandler}
                  >
                    Sign up
                  </button>
                  <br />
                </div>
              </form>
            </div>
          )
        ) : (
          <div>
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
                <button
                  className="btn btn-primary"
                  onClick={this.signUpBtnHandler}
                >
                  Sign up
                </button>
                <br />
              </div>
            </form>
          </div>
        )}
      </div>
    );
  };
}

export default Login;
