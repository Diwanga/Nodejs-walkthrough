const fs = require("fs");
const path = require("path");
const Product = require("./product");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addproduct(id, price) {
    //ffetching
    fs.readFile(p, (err, filecontent) => {
      let cart = { products: [], totalprice: 0 };
      if (!err) {
        cart = JSON.parse(filecontent);
      }

      const existingProdutIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const existingProdut = cart.products[existingProdutIndex];
      let updatedProduct;
      if (existingProdut) {
        updatedProduct = { ...existingProdut };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProdutIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalprice = cart.totalprice + +price;

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log("asdasdasd" + err);
      });
    });
  }

  static deletefromcart(id, productprice) {
    fs.readFile(p, (err, filecontent) => {
      if (err) {
        return;
      }
      console.log("ccar delete id " + id);
      const cart = JSON.parse(filecontent);
      const updatecart = { ...cart };
      const upproduct = updatecart.products.find(
        (product) => product.id === id
      );

      if(!upproduct){
        return;
      }
      const productqty = upproduct.qty;

      console.log(productqty + "    " + productprice);
      updatecart.totalprice = updatecart.totalprice - productqty * productprice;
      updatecart.products = updatecart.products.filter(
        (product) => product.id !== id
      );

      fs.writeFile(p, JSON.stringify(updatecart), (err) => {
        console.log("asdasdasd" + err);
      });
    });
  }

  static getCartitems(cb){

    fs.readFile(p, (err, filecontent) => {

      if(err){
        cb([]);
        };
       if (!err) {

         const cartitems = {...JSON.parse(filecontent)};
        //  const cartprodids = cartitems.products.map(product =>{ return product.id
        //  })
      //   console.log(cartprodids);
         cb(cartitems);

        //  Product.fetchAll(products =>{

        //  if(products.length == 0){
        //   cb([]);
        //  }
        //  else{
        //    const cartdetails = products.filter(product=>{ cartprodids.includes(product.id);});
        //    console.log(cartdetails);
        //  }
        //  })
         
         ;
         
         


       }



    });
  }
  
}
;


// CART SOLUTION

// Cart is always there. no recreating line produts. so dont want constructor

// SO we add addproduct satitc method. (hee cart class is utility clss)

// and

// 1 fetch the  existing cart

// 2  see if this item awailable

// 3 if available incewmwnt qty and add pirice if not add the item and price

// 4 save new cart details to file(database till for now)
