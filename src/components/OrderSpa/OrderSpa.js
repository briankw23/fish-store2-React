import React from 'react';
import {Link} from 'react-router-dom';
import ordersRequests from '../../firebaseRequests/orders';
import authRequests from '../../firebaseRequests/auth';
import './OrderSpa.css';
import moment from 'moment';

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
        <button
          key= {order.id}
          className= "col-xs-12 btn btn-default order-button"
        >
          <span className="col-xs-6">Order Number: {order.id}</span>
          <span className="col-xs-6">Order Date: {moment(order.dateTime).format('LLL')}</span>
        </button>
      );
    });
    return (
      <div className="OrderSpa">
        <h2>Orders</h2>
        <button>
          <Link to="/new">New Order</Link>
        </button>
        <ul>
          {orderComponenets}
        </ul>
      </div>
    );
  }
};

export default OrderSpa;
