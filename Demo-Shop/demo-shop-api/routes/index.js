var routes = require('express').Router();

var Product = require('../model/product');
var Wishlist = require('../model/wishlist');
var Cart = require('../model/cart');

routes.get('/product', function(req, res) {
  // res.set("Access-Control-Allow-Origin": *);
  // res.set("mode": "no-cors");
  //.find finds all, .findOne finds one. *****.find is an async task (on separate thread)******
  Product.find({}, function(err, products) {
    if (err) {
      res.status(500).send({
        error: "Could not get products"
      });
    } else {
      res.status(200).send(products);
    }
  });
});

routes.post('/product', function(request, response) {
  var product = new Product();
  product.title = request.body.title;
  product.price = request.body.price;
  product.save(function(err, savedProduct) {
    if (err) {
      response.status(500).send({
        error: "Could not save product"
      });
    } else {
      response.status(200).send(savedProduct);
    }
  });
});

routes.post('/cart/:cartId', function(req, res) {
  var usersCart;
  var userId = req.params.cartId;
  Cart.find({
    id: userId
  }, function(err, cart) {
    if (err) {
      //code for if it cant find a cart with matching user ID in the database.
      usersCart = new Cart();
      usersCart.id = userId;
      //save new cart with users ID to the database.
      usersCart.save(function(err, savedCart) {
        if (err) {
          res.status(500).send("Could not add cart");
        } else {
          res.status(500).send("You didn't have one, but you have created a new cart!" + savedCart);
        }
      });
      //code for if they did have a cart
    } else {
      Product.find({
        _id: req.body.id
      }, function(err, product) {
        if (err) {
          res.status(500).send("Sorry, that product is not available");
        } else {
          Cart.update({id: cart.id}, {$addToSet: {products: product._id}}, function(err, cart){
            if (err) {
              res.status(500).send("Sorry, we could not update your cart");
            }else {
              res.send("Successfully added to cart! Here are the items in your cart: " + cart);
            }
          });

        }
      });
    }
  });
});

routes.get('/wishlist', function(req, res){
  Wishlist.find({}).populate({path: 'products', model: 'Product'}).exec(function(err, wishlists){

    if (err) {
      res.status(500).send({error: 'Could not get wishlists'});
    } else {
      res.send(wishlists);
    }
  });
});

routes.put('/wishlist/product/add', function(req, res){
  Product.findOne({_id: req.body.productId}, function(err, product){
    if (err) {
      res.status(500).send({error: "Could not find product"});
    } else {
      //Update the wishlist. The first thing you need to do is find the wishlist to update. Here we are finding by _id
      //that is equal to the value passed into the body under wishListId.
      Wishlist.update({_id: req.body.wishListId}, {$addToSet:{products: product._id}}, function(err, wishList){
        if (err) {
          res.status(500).send({error: "Could not add product to wishlist"});
        } else {
          res.send(wishList);
        }
      });
    }
  });
});

routes.put('/wishlist/addwishlist', function(req, res){
  var newWishlist = new Wishlist();

  newWishlist.title = req.body.title;

  newWishlist.save(function(err, wishlistSuccess){
    if (err) {
      res.status(500).send({error: "Could not save wishlist"});
    } else {
      res.send(wishlistSuccess);
    }
  })

});

var imgUrls = [];
imgUrls.push("https://images-na.ssl-images-amazon.com/images/I/51iB9qEWsML._SX425_.jpg");
imgUrls.push("https://i.pinimg.com/originals/c2/cc/2e/c2cc2eabdca569056a66d2500e07b3ac.gif");
imgUrls.push("https://i.pinimg.com/originals/c2/cc/2e/c2cc2eabdca569056a66d2500e07b3ac.gif");
imgUrls.push("https://vacomicon.com/wp-content/uploads/2018/02/58838714-500-0.jpg");
imgUrls.push("https://www.seriouseats.com/2018/06/20180625-no-churn-vanilla-ice-cream-vicky-wasik-13-1500x1125.jpg");

routes.put('/product-add-imgUrl', function(req, res){
  Product.find({}, function(err, products){
    for (var i = 0; i < products.length; i++) {
      Product.update({_id: products[i]._id}, {imgUrl: imgUrls[i]}, function(err, updatedProducts){
        if (err) {
          res.status(500).send({error: "Error updating imgurls"});
        } else {
          console.log(updatedProducts);
        }
      })
    }
    if (!err) {
      res.send(products);
    }
  })
  //get selected item.
  // Product.update({_id: req.body.id}, {imgUrl: req.body.imgUrl}, function(err, updatedProduct){
  //   if (err) {
  //     res.status(500).send({error: "Could not update product"});
  //   } else {
  //     res.send(updatedProduct);
  //   }
  // })
})



module.exports = routes;
