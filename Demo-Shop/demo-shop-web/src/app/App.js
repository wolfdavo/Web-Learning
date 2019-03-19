import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HttpService from '../services/http-service.js';

//components
import Product from '../product/product.js'
import WishList from '../wishlist/wishlist'

//services
const http = new HttpService();


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {products:[]};


    //MAKE SURE TO BIND EVERY FUNCTION YOU CREATE!!!!
    this.loadData = this.loadData.bind(this);
    this.productList = this.productList.bind(this);

    this.loadData();
  }


  loadData = () => {
    //Use a var as an anchor for the .this because we need to use in inside an async task so .this gets messed up.
    var self = this;
    //getProducts immediately returns a promise because it is asynchronous. The .then function runs
    //as soon as that promise is fulfilled. The parameters for the first arrow function are !null if
    //the promise returns a resolve. The second functions runs if it rejects.
    http.getProducts().then(data => {
      //Every time you call setState the whole component is re-loaded!!
      self.setState({products: data});
    }, err => {

    });
  }


productList = () => {
  //Map function basically loops through all the items in the products array. The products array is defined above in the constructor and is populated with data from the server. The parameter of the map function is essensially the product that the loop is on at any given moment.
  const list = this.state.products.map((product) =>
    //Every unique UI element made from the map loop has to have a unique ID. This is easy for us because we are working with Mongo and every document has a unique _id that we can call and set as the key for the component we are making.
    <div className="col-sm-4" key={product._id}>
      <Product title={product.title} price={product.price} imgUrl={product.imgUrl}/>
    </div>
  );
  return (list);
}




  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />


          <div className="container-fluid App-main">
            {//Here we imported our product.js component.
            //We pass through values attributed to the key names such as price and title.
            //We can use these key names in the JS file to add data to the object dynamicaly.
            }
            <div className="row">
              <div className="col-sm-8">
                <div className="row">
                {this.productList()}
                </div>
              </div>
                <div className="col-sm-4">
                  <WishList />
                </div>
            </div>
          </div>

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
