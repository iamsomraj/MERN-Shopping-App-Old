/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const Order = props => (
  <tr>
    <td>{props.order._id}</td>
    <td>{props.order.quantity}</td>
    <td>{props.order.productId}</td>
    <td>{new Date().toUTCString(props.order.createdAt)}</td>
    <td>
      <a href="#" onClick={() => props.deleteOrder(props.order._id)}>
        Delete
      </a>
    </td>
  </tr>
);

export default Order;
