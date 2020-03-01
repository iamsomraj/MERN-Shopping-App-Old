import React from 'react';
import Axios from '../../Axios';
import Order from './Order';

class Orders extends React.Component {
  state = {
    orders: [],
    message: '',
    token: ''
  };

  componentDidMount = () => {
    Axios.get('/orders')
      .then(response => {
        console.log(response);
        console.log(response.data);
        this.setState({
          message: response.data.message,
          orders: response.data.fetchedOrders
        });
      })
      .catch(error => {
        this.setState({
          message: error.message
        });
      });
  };

  onDeleteOrderHandler = id => {
    Axios.delete('/orders/' + id)
      .then(response => {
        this.setState({
          message: response.data.message
        });
      })
      .then(() => {
        this.setState({
          orders: this.state.orders.filter(orders => id !== orders._id)
        });
      })
      .catch(error => {
        this.setState({
          message: error.message
        });
      });
  };

  orderList = () => {
    if (this.state.orders.length > 0) {
      return this.state.orders.map(currentOrder => {
        console.log(currentOrder);
        return (
          <Order
            key={currentOrder._id}
            order={currentOrder}
            deleteOrder={this.onDeleteOrderHandler}
          />
        );
      });
    }
  };

  render = () => {
    return (
      <div
        className="shadow container"
        style={{ margin: '5rem', padding: '2rem' }}
      >
        <br />
        <div className="display-4">Orders</div>
        <br />
        <div className="text text-primary">
          <br />
          {this.state.message === '' ? null : this.state.message}
          <br />
          <br />
        </div>
        {this.state.orders.length === 0 ? null : (
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Order Id</th>
                <th>Quantity</th>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Date Ordered</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{this.orderList()}</tbody>
          </table>
        )}
      </div>
    );
  };
}

export default Orders;
