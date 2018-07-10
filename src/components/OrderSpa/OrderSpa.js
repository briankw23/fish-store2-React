import React from 'react';
import ordersRequests from '../../firebaseRequests/orders';
import authRequests from '../../firebaseRequests/auth';
import './OrderSpa.css';

class OrderSpa extends React.Component {
  state = {
    orders: [],
  }
  componentDidMount () {
    ordersRequests
      .getRequest(authRequests.getUid())
      .then((orders) => {
        this.setState({ orders });
      })
      .catch((err) => {
        console.error('error with orders get request', err);
      });
  }

  render () {
    const orderComponenets = this.state.orders.map((order) => {
      return (
        <button>{order.id}</button>
      );
    });
    return (
      <div className="OrderSpa">
        <h2>Orders</h2>
        <button>New Order</button>
        <ul>
          {orderComponenets}
        </ul>
      </div>
    );
  }
};

export default OrderSpa;
