/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import Axios from '../../Axios';
import { Link } from 'react-router-dom';

const Product = props => (
  <div>
    <div
      className="shadow card rounded"
      style={{ width: '18rem', padding: '0.5rem' }}
    >
      <img
        className="card-img-top"
        style={{ height: '12rem', width: '17rem' }}
        src={'http://localhost:5000/' + props.img.slice(7)}
        alt="Product Image"
      />
      <div className="card-body">
        <h4 className="card-title">
          {props.name}{' '}
          <span>
            {' '}
            {'- $'}
            {props.price}
          </span>
        </h4>
        <br />
        {Axios.defaults.headers.common['User'] ? (
          Axios.defaults.headers.common['User'].split(' ')[1] ===
          props.seller ? (
            <Link
              to={'/products/edit/' + props.id}
              className="btn btn-primary text-white"
            >
              Edit
            </Link>
          ) : null
        ) : null}
        <br />
        <br />
        <div className="card-text">{'Product ID ' + props.id}</div>
        <br />
        <input
          type="number"
          className="form-control"
          value={props.quantity}
          onChange={props.quantityHandler}
        />
        <br />
        <button onClick={props.buy} className="btn btn-primary text-white">
          Buy
        </button>
        <br />
        <br />
        <p className="card-text lead">{'Seller ' + props.seller}</p>
      </div>
    </div>
  </div>
);

export default Product;
