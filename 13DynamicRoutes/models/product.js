const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id = id; // aluth ekak nm id ekak den ne. ema unoth null. sava method ekedi ekak deno
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    
    getProductsFromFile(products => {
      if(this.id){
      const toupdateproduct = products.findIndex(product => product.id ===this.id);
      const updatedproducts = [...products];
      updatedproducts[toupdateproduct] = this;
      products= updatedproducts;
      } else{        
              this.id = Math.random().toString();
              products.push(this);
      }
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log("Error is " + err);
      });
    });
  }

 
  static deleteproduct(id){
    getProductsFromFile(products=>{
       const deleteproduct = products.find(product=> product.id === id);
      // MY WAY 
      // const deleteindex = products.findIndex(product => product.id === id);
      // console.log("delete index"+deleteindex)
      // products.splice(deleteindex,1);

      const updatedproducts = products.filter(product  => product.id !== id);


      fs.writeFile(p, JSON.stringify(updatedproducts), err => {
        console.log("Error is " + err);
        if(!err){


         
          Cart.deletefromcart(id,deleteproduct.price);
        }

      });
    });

  }
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findbyid(id ,cb ){
    getProductsFromFile(products =>{
      const product = products.find(p=> p.id === id);
      cb(product);

    });

  }

};
