import React from 'react';
import formatPrice from '../../helpers';
import './Order.css';

class Order extends React.Component {
  renderOrder = (key) => {
    const fish = this.props.fishes.find(x => x.id === key);
    const count = this.props.order[key];

    return (
      <li
        key={key}
        className="text-text"
      >
        <div className="col-xs-2">{count} lbs</div>
        <div className="col-xs-5"> {fish.name}</div>
        <div className="col-xs-3">{formatPrice(fish.price)}</div>
        <div className="col-xs-2">
          <button className="btn btn-default">&times;</button>
        </div>
      </li>
    );
  };
  render () {

    const orderIds = Object.keys(this.props.order);

    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes.find(x => x.id === key);
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);
    return (
      <div className="Order">
        <h2>Order</h2>
        <ul>
          {orderIds.map(this.renderOrder)}
        </ul>
        <div className="total"><strong>Total:{formatPrice(total)}</strong> </div>
        <button className="btn btn-default"><strong>Save Order</strong></button>
      </div>
    );
  }
};

export default Order;
