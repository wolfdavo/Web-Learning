import React, { Component } from 'react'
import './wishlist.css'
import ProductCondensed from '../product-condensed/product-condensed'
import NotificationService from '../services/notification-service'
import DataService from '../services/data-service'

class Wishlist extends Component {

  constructor(props){
    super(props);

    this.state = {wishlist: [
      {
        title: "Bolonga Killer",
        price: 29.99,
        _id: "vxe45678ikj"
      },
      {
        title: "Bolonga",
        price: 48.50,
        _id: "vxe45dsd78ikj"
      },
      {
        title: "Doggo",
        price: 100,
        _id: "vxeawe678ikj"
      }
    ]}

    //Bind functions
    this.creatWishList = this.creatWishList.bind(this);
  }

  creatWishList = () => {
    const list = this.state.wishlist.map((product) =>
      <ProductCondensed product={product} key={product._id}/>
    );
    return (list);
  }


  render() {
      return(
        <div className="card">
          <div className="card-block">
            <h4 className="card-title">Wish List</h4>
            <ul className="list-group">
              {this.creatWishList()}
            </ul>
          </div>
        </div>
    );
  }
}

export default Wishlist;
