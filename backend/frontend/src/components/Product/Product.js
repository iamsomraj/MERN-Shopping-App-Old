/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';

const Product = props => (
  <div>
    <div className="shadow card" style={{ width: '18rem' }}>
      <img
        className="card-img-top"
        src={'http://localhost:5000/' + props.img.slice(7)}
        alt="Product Image"
      />
      <div className="card-body">
        <h3 className="card-title">
          {props.name}{' '}
          <span>
            {' '}
            {'- $'}
            {props.price}
          </span>
        </h3>
        <p className="card-text">{props.id}</p>
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
        <p className="card-text lead">Seller ID {props.seller}</p>
      </div>
    </div>
  </div>
);

export default Product;
