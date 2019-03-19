//Curly braces mean were importing a specific thing from React. In this case, a component.
import React, { Component } from 'react'

import './product.css'

//Making a new class that extends all the code from a react component.
class Product extends Component {
  //render function is a child of the Component. It is used to render things to the screen.
  //It is not standard ES6, purely a react function.
  render() {
      return(
      <div className="card product">
        {/* In react, always make sure to close html tags even if its just an img tag which you could leave without a closing tag in vanilla html */
        //The {} lets you insert js into the html. Here we are calling props that can be fed into the <Product/> tag when it is used in a render on a page.
      }
        <img className="card-img-top" src={this.props.imgUrl} alt="Product"></img>
        <div className="card-block">
          <h4 className="card-title">{this.props.title}</h4>\
          <p className="card-text">Price: ${this.props.price}</p>
          <button className="btn btn-primary">Add to wishlist</button>
        </div>
      </div>
    );
  }
}

export default Product;
