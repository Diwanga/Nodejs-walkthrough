const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      //array destructuring

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

exports.getprodut = (req, res, next) => {
  const prodID = req.params.productId;


  //SECOND METHOD
// Product.findAll({where : {id : prodID}})
// .then((products) => {  
//   // in this method ome array. we have to get [0]
//   // console.log(product);
//   res.render("shop/product-detail", {
//     pageTitle: products[0].title,
//     path: "/products",
//     product: products[0],
//   });
// })
// .catch((err) => {
//   console.log(err);
// });



  Product.findByPk(prodID)
    .then((product) => {
      // in sequlixe came singal object
      // console.log(product);
      res.render("shop/product-detail", {
        pageTitle: product.title,
        path: "/products",
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch();
};

exports.getCart = (req, res, next) => {
 req.user
 .getCart()
 .then(cart =>{
  return cart.getProducts().then(products=>{
   // console.log("menna ena cart item data eka product wise  "+products[0].cartItem.quantity);
    res.render("shop/cart", {
      cartitems: products,
      pageTitle: "cart",
      path: "/",
    }
  )
 })
 .catch();
}
 )
};

exports.postCart = (req, res, next) => {
  const prodid = req.body.productid;
  let fetchcart; // to avaible in all pomises
  let newquantity = 1; // to avaible in all below pomises
req.user.getCart()

.then(cart =>{
  fetchcart = cart;
  return cart.getProducts({where:{id:prodid}})
})
.then(products=>{
  let product
  if(products.length >0){
    product = products[0]
  }
  
  if(product){ // thiye nm undefine neee
    const oldquentity = product.cartItem.quantity;
    newquantity = oldquentity+1;
    return product;
    
  }
   return Product.findByPk(prodid) // for new product adding
  
   
})
.then(product=>{
  return fetchcart.addProduct(product,{through : {quantity:newquantity}}) //throug dana thawath thenak(thawa colum ekakata)
}).then(()=>{
  // console.log("ADDED TO CART"+ cartitem);
  res.redirect("/cart");
})
.catch(err=>{
  conssole.log(err);
});

  
};

exports.deletecartitem = (req, res, next) => {
  const prodid = req.body.productId;
  console.log("skajdhhhhhhhhhhhhhhhhhhh  "+prodid);
  req.user.getCart()
  .then(cart =>{
return cart.removeProducts(prodid)

  }).then(()=>{
    res.redirect("/cart")
  })
  .catch(err=>{

    console.log(err)
  })
};
//max widiya
// exports.deletecartitem = (req, res, next) => {
//   const prodid = req.body.productId;
//   console.log("skajdhhhhhhhhhhhhhhhhhhh  "+prodid);
//   req.user.getCart()
//   .then(cart =>{
// return cart.getProducts({where:{id:prodid}})

//   }).then(products=>{
//     const product = products[0]
//     return product.cartItem.destroy();
//   }).then(()=>{
//     res.redirect("/cart")
//   })
//   .catch(err=>{

//     console.log(err)
//   })
// };






exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
