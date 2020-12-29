
const Product = require('../models/product');

exports.getadminpoducts = (req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  };

  exports.postadminproducts = (req, res, next) => {
    // products.push({ title: req.body.title });
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
  };

  exports.getshopprroducts = (req, res, next) => {
    // const products = Product.fetchall()    this will not use async
    Product.fetchall((products)=>{ //annonymous function which is called after the fetchall done
      res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
      });
      
    });
  };