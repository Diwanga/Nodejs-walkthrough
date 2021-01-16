const Product = require('../models/product');
const User = require('../models/user');

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
  req.user.createProduct({ // magic assosiation by seqalize  // den req.user.id ona ne
    title : title,
    price : price,
    description : description,
    imageUrl : imageUrl,
  }).then(result =>{
    console.log(result);
    res.redirect('/')
  })
  .catch(err =>{
    console.log(err);
  }
  );
//magin assosiation nowana widiyanowana widiya
  // Product.create({
  //   title : title,
  //   price : price,
  //   description : description,
  //   imageUrl : imageUrl,
  //   userId : req.user.id


  // }).then(result =>{
  //   console.log(result);
  //   res.redirect('/')
  // })
  // .catch(err =>{
  //   console.log(err);
  // }
  // );

 // const product = new Product(null,title, imageUrl, description, price);
  
// const existingProdutIndex = cart.products.findIndex(product => product.id === id);
// const existingProdut = cart.products[existingProdutIndex];
// let updatedProduct;

//     updatedProduct = {...existingProdut};
//     updatedProduct.qty = updatedProduct.qty + 1;
//     cart.products = [... cart.products];
//     cart.products[existingProdutIndex] = updatedProduct;
  
  
  // product.save().then(()=>{
    
  //   res.redirect('/')
  // }
  // )
  // .catch(err=>{
  //   console.log(err);
  // });

};

exports.getEditProduct = (req, res, next) => {
   const editMode =req.query.edit; //here it as string. so true false null all are the as string or true logically
   console.log(editMode);
   if(!`editMode`){
     return res.redirect('/');
   }else{
    const prodid = req.params.productId;
    // console.log(prodid);
    req.user.getProducts({where : {id:prodid}}) // magic method // meken enne array ekak
    // Product.findByPk(prodid) ////////////// me magin method ekata kalin widiya

    .then(product=>{
      console.log("Edite product details");
      console.log(product);
      if(!product){
        return res.redirect('/');
      }
     // console.log(product);
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product : product[0] // magic deno nm [0] ona . findbypk walin nm enne ekai nisa on ne

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
  // const product = new Product(id,title, imageUrl, description, price);
 
//max widiya
Product.findByPk(id).then(
  product =>{
    product.title = title;
    product.price = price;
    product.description = description;
    product.imageUrl = imageUrl;
    return product.save() ;  /// meken db eke id thina row eka knethnm eka hadala hari danawa
  }
).then(result=>{ // me save promis eke
        console.log(result)
      res.redirect('/admin/products');
})
.catch(err =>{
  console.log(err);  // methna promis 2kema ewa allanawa
});





  //mage widiya
  // Product.update(
  //   { title: title,
  //    price :price,
  //    description:description,
  //    imageUrl:imageUrl },
  //   { where: { id: id } }
  // )
  //   .then(result =>{
      
  //     console.log(result)
  //     res.redirect('/admin/products');
  //   }
  //   )
  //   .catch(err =>{

  //     console.log(err);
  //   }
  //   );

}


exports.postDeleteProduct = (req,res,next)=>{
  const deleteid = req.body.productId;
  Product.findByPk(deleteid).then(
product =>{
return product.destroy();
}

  ).then(result=>{
    res.redirect('/admin/products');

  }).catch(err=>{
    console.log(err);
  });



}

exports.getProducts = (req, res, next) => {
  req.user.getProducts() //magic
  // Product.findAll()  before magic
  .then(
    products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(
    err=>{
      console.log(err);
    }
  );
};
