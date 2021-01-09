const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,fielddata])=>{ //array destructuring
    console.log(rows);
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err =>{
    console.log(err);
  });
  
};



exports.getprodut = (req,res,next)=>{
  
 const prodID = req.params.productId;

Product.findbyid(prodID).then(([row,otherdata])=>{
  console.log(row[0]);
res.render('shop/product-detail',{
  pageTitle: row[0].title,
  path: '/products',
  product :row[0]

 });
}).catch(err =>{
  console.log(err);
});

  
}




exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,fieldata])=>{
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
    

  })
  .catch();
};

exports.getCart = (req, res, next) => {
  Cart.getCartitems(  cartitems =>{
    console.log(cartitems);
    if(cartitems.products.length == 0){
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        cartitems: []
      });
      
    }else{
    Product.fetchAll(products =>{

      const cartdeetils= [];

      for(product of products){
      cartprodutdata = cartitems.products.find(prod=> prod.id === product.id);
        
        if(cartprodutdata){
          cartdeetils.push({product:product , qty : cartprodutdata.qty});
        }
      }
    
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        cartitems: cartdeetils
      });

    });
    
  }
  })
};
exports.postCart = (req,res,next)=>{
const prodid = req.body.productid;
Product.findbyid(req.body.productid ,product=>{
  Cart.addproduct(prodid,product.price)
})


// console.log("ADDED TO CART"+ cartitem);
res.redirect('/cart');

}

exports.deletecartitem = (req,res,next)=>{

  const prodid = req.body.productId;
  console.log(prodid);
  Product.findbyid(prodid, product=>{
  Cart.deletefromcart(prodid,product.price) // apita meka iissarahoin price gennanth  aki. but all data retrival backed eke thiyagamu
  res.redirect('/cart');
  
  });
   
  }


exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
