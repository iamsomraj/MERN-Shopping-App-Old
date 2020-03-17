/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const Order = props => {
  if (props.order.productId) {
    return (
      <tr>
        <td>{props.order._id}</td>
        <td>{props.order.quantity}</td>
        <td>{props.order.productId._id}</td>
        <td>{props.order.productId.name}</td>
        <td>
          {new Date(props.order.createdAt).getDate() +
            '.' +
            new Date(props.order.createdAt).getMonth() +
            '.' +
            new Date(props.order.createdAt).getFullYear() +
            '   ' +
            new Date(props.order.createdAt).getHours() +
            ':' +
            new Date(props.order.createdAt).getMinutes() +
            ':' +
            new Date(props.order.createdAt).getSeconds()}
        </td>
        <td>{props.order.productId.price * props.order.quantity}</td>
        <td>
          <a href="#" onClick={() => props.deleteOrder(props.order._id)}>
            Delete
          </a>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{props.order._id}</td>
      <td>{props.order.quantity}</td>
      <td style={{ color: 'red'}}>{'Product Deleted by Owner - Unavailable'}</td>
      <td style={{ color: 'red'}}>{'Product Deleted by Owner - Unavailable'}</td>
      <td>{new Date().toUTCString(props.order.createdAt)}</td>
      <td style={{ color: 'red'}}>{'Product Deleted by Owner - Unavailable'}</td>
      <td>
        <a href="#" onClick={() => props.deleteOrder(props.order._id)}>
          Delete
        </a>
      </td>
    </tr>
  );
};

export default Order;
