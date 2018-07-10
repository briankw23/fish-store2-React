import React from 'react';

import './Fish.css';

import formatPrice from '../../helpers';

class Fish extends React.Component {
  addClickEvent = () => {
    this.props.addToOrder(this.props.details.id);
    console.error(this.props.details.id);
  }
  render () {
    const { details } = this.props;
    const image = require(`${details.image}`);
    const isAvailible = details.status === 'available';
    return (
      <li className="Fish">
        <img src={image} alt={details.name}/>
        <h3 className="name">
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button
          disabled={!isAvailible}
          onClick={this.addClickEvent}
        >
          {isAvailible ? 'Add to Order' : 'Sold Out'};
        </button>
      </li>
    );
  }
};

export default Fish;
