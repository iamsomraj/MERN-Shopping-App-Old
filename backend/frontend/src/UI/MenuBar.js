import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MenuBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          Shopping
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Products
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/products/add" className="nav-link">
                Create Product
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/orders/" className="nav-link">
                Orders
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/users/login" className="nav-link">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
