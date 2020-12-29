// const products = [];

const { json } = require("body-parser");
const fs = require("fs");
const path = require("path"); //for all operating sys
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getallproducts = (cb)=>{
    fs.readFile(p, (err, filedata) => {
        //this is asyncronius code. this will nor run at once. So it cant get fetchall().length ar once. So have to use callback function, which is run after do the thing in fetch all.
        if (err) {
          // return [];
          cb([]);
        }else{
        cb(JSON.parse(filedata));
        }
      });

}
module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
  
    getallproducts(products =>{
        products.push(this); //if not use arow function this will saying file. notclass
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      });

  }

  static fetchall(cb) {
    getallproducts(cb);

  }
};
