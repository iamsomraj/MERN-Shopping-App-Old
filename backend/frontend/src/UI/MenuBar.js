import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MenuBar extends Component {
  render() {
    return (
      <nav className="navbar fixed-top navbar-dark bg-primary navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          React Mart
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Products
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/orders/" className="nav-link">
                Orders
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/users/login" className="nav-link">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
