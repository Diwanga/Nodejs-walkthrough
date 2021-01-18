const Product = require("../models/product");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
  Product.find() // mongoos wala .curser().next() wwage cuser allanna aki
    .then((products) => {
      // find() eken denne currser neme. product tika   PROMIS
      console.log(products);
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate() // meken passe thama polulate wala promis eka denne// execue karanne
    .then((user) => {
      console.log(user.cart.items);
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: user.cart.items,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// })

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      // console.log(req.user.addToCart)
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate() // meken passe thama polulate wala promis eka denne// execue karanne
    .then((user) => {
      const products = user.cart.items.map((i) => {
       
        return { quantity: i.quantity , product: { ...i.productId._doc } }; //product : i.productId  meken db eke store wenne object ekak. wisthra ne
      }); // _doc kiyanne mongoos dena ekak            //populate karapu ekak expad kranawa
      // console.log(user.cart.items);
     // console.log('asdasdasdasd'+products[0].quantity)
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user, // auto assing id mongooass
        },
        products: products,// meka  haiyawama athule schema eke nam thinna ona
      });

      return order.save();
    })
    .then(() => {
      req.user.clearCart()
    })
    .then(()=>{
      
      res.redirect("/orders");
    })

    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({'user.userId' :req.user._id})  ///where
    .then((orders) => {
      console.log(orders)
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};
