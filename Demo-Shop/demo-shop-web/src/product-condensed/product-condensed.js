import React, { Component } from 'react'
import './product-condensed.css'

class ProductCondensed extends Component {

  render() {
      return(
        <li className="list-group-item product-condensed">
          <a href="#" className="btn btn-outline-danger">&#10006;</a>
          <p>{this.props.product.title} | <b>${this.props.product.price}</b></p>
        </li>
    );
  }
}

export default ProductCondensed;
