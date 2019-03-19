var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var wishlist = new Schema({
  title: {type: String, default: "Cool Wish List"},
  //The wishlists just hold product IDs instead of a whole product object. This means we dont need to
  //have duplicate data in our database and can just use the IDs to reference to the products
  products: [{type: ObjectId, ref: 'Product'}]
});

module.exports = mongoose.model('Wishlist', wishlist);
