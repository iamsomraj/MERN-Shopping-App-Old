/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import Axios from '../../Axios';
import { Link } from 'react-router-dom';
import './Product.css';

class Product extends React.Component {

  render = () => (
    <div>
      <div
        className="shadow card card-fluid rounded bg-light product"
        style={{
          width: '18rem',
          padding: '0.5rem'
        }}
      >
        <img
          className="card-img-top"
          style={{ height: '12rem', width: '17rem' }}
          src={'/' + this.props.img.slice(7)}
          alt="Product Image"
        />
        <div className="card-body">
          <h4 className="card-title">
            {this.props.name}{' '}
            <span>
              {' '}
              {'- $'}
              {this.props.price}
            </span>
          </h4>
          <br />
          {Axios.defaults.headers.common['User'] &&
          Axios.defaults.headers.common['Authorization'] ? (
            Axios.defaults.headers.common['User'].split(' ')[1] ===
              this.props.seller &&
            Axios.defaults.headers.common['Authorization'].split(' ')[1] ? (
              <Link
                to={'/products/edit/' + this.props.id}
                className="btn btn-primary text-white"
              >
                Edit
              </Link>
            ) : null
          ) : null}
          <br />
          <br />
          <div className="card-text">{'Product ID ' + this.props.id}</div>
          <br />
          <div className="card-text">
            {this.props.msg !== '' ? this.props.msg : null}
          </div>
          <br />
          <input
            disabled={this.props.seller === this.props.buyDisable}
            type="number"
            className="form-control"
            value={this.props.quantity}
            onChange={this.props.quantityHandler}
          />
          <br />
          <button
            disabled={this.props.seller === this.props.buyDisable}
            onClick={this.props.buy}
            className="btn btn-primary text-white"
          >
            Buy
          </button>
          <br />
          <br />
          <p className="card-text lead">{'Seller ' + this.props.seller}</p>
        </div>
      </div>
    </div>
  );
}

export default Product;
