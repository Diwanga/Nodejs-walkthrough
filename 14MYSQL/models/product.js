const db = require('../util/database');


const Cart = require('./cart');




module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id = id; // aluth ekak nm id ekak den ne. ema unoth null. sava method ekedi ekak deno
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute("INSERT INTO products (title,price,description,imageUrl) VALUES(?,?,?,?)",
    [this.title,this.price,this.description,this.imageUrl] //prepapered quaries // no SQL injection happen
    );
  }

 
  static deleteproduct(id){

  }
  static fetchAll() {
  return db.execute('SELECT * from products')

  }

  static findbyid(id ){
 return db.execute("SELECT * FROM products WHERE products.id = ?",[id]);
  }


};
