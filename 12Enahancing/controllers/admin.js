const Product = require('../models/product');

exports.getaddpoducts = (req, res, next) => {
    res.render('admin/add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  };

  exports.postaddproducts = (req, res, next) => {
    // products.push({ title: req.body.title });
    const product = new Product(req.body.title,req.body.imageurl,req.body.description,req.body.price);
    product.save();
    res.redirect('/');
  };
  exports.getpoducts = (req, res, next) => {
    Product.fetchall((products)=>{ //annonymous function which is called after the fetchall done
        res.render('admin/products', {
          prods: products,
          pageTitle: 'ALL Products',
          path: '/admin/products',
   
        });
        
      });
  };
