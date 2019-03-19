var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var cart = new Schema({
  title: {type: String, default: "Shopping Cart"},
  id: String,
  products: [{type: ObjectId, ref: "Product"}]
});

module.exports = mongoose.model("Cart", cart);
