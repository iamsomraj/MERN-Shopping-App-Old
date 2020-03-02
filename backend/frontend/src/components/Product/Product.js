/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import Axios from '../../Axios';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = props => (
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
        {Axios.defaults.headers.common['User'] &&
        Axios.defaults.headers.common['Authorization'] ? (
          Axios.defaults.headers.common['User'].split(' ')[1] ===
            props.seller &&
          Axios.defaults.headers.common['Authorization'].split(' ')[1] ? (
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
        <div className="card-text">{props.msg}</div>
        <br />
        <input
          disabled={props.seller === props.buyDisable}
          type="number"
          className="form-control"
          value={props.quantity}
          onChange={props.quantityHandler}
        />
        <br />
        <button
          disabled={props.seller === props.buyDisable}
          onClick={props.buy}
          className="btn btn-primary text-white"
        >
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
