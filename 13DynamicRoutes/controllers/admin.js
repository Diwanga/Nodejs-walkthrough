const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,

  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  
// const existingProdutIndex = cart.products.findIndex(product => product.id === id);
// const existingProdut = cart.products[existingProdutIndex];
// let updatedProduct;

//     updatedProduct = {...existingProdut};
//     updatedProduct.qty = updatedProduct.qty + 1;
//     cart.products = [... cart.products];
//     cart.products[existingProdutIndex] = updatedProduct;
  
  
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
   const editMode =req.query.edit; //here it as string. so true false null all are the as string or true logically
   console.log(editMode);
   if(!editMode){
     return res.redirect('/');
   }else{
    const prodid = req.params.productId;
    console.log(prodid);
    Product.findbyid(prodid,product=>{
      if(!product){
        return res.redirect('/');
      }
     // console.log(product);
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product : product

    })
       
      });
    }
};

exports.postEditProduct = (req,res,next) =>{
  // const id = req.params.productId;  this would be done if we post data through routung parameter
 const id =req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(id,title, imageUrl, description, price);
 
  product.save();
  res.redirect('/admin/products');

}


exports.postDeleteProduct = (req,res,next)=>{
  const deleteid = req.body.productId;
  
  console.log(deleteid);

  if(deleteid){
    Product.deleteproduct(deleteid);
    
  }else{
    console.log("NO ID COME TO DELLETE");
  }

  res.redirect('/admin/products');


}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
