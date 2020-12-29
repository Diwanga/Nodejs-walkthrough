
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
   
    res.render('shop', {
      prods: Product.fetchall(),
      pageTitle: 'Shop',
      path: '/',
      hasProducts: Product.fetchall().length > 0,
      activeShop: true,
      productCSS: true
    });
  };