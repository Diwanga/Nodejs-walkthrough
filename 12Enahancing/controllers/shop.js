
const Product = require('../models/product');

  exports.getshopprroducts = (req, res, next) => {
    // const products = Product.fetchall()    this will not use async
    Product.fetchall((products)=>{ //annonymous function which is called after the fetchall done
      console.log(products);
      res.render('shop/product-list', {       
        prods: products,
        pageTitle: 'Shop',
        path: '/products',
 
      });
      
    });
  };

  exports.getindex = (req, res, next) => {
    // const products = Product.fetchall()    this will not use async
    Product.fetchall((products)=>{ //annonymous function which is called after the fetchall done
      console.log(products);
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
 
      });
      
    });
  };

  exports.getcart = (req,res,next)=>{
 res.render('shop/cart', {
 
  pageTitle: 'Your Cart',
  path: '/',

});


  }

  exports.getcheckout = (req,res,next)=>{
res.render('shop/checkout',{
  pageTitle: 'Checkouts',
  path: '/checkout',
});

  }

