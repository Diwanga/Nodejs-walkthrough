const express = require("express");
const path = require("path");
const route = express.Router();
const rootPath = require("../utils/path")




route.post('/add-product',(req,res,next)=>{   //use wenuwata apita get post put delete pawihh krala req filter karanna puluwan

    console.log("middleware /add procuct post");
     console.log(req.body);
     res.redirect('/')
}); 
route.get('/add-product',(req,res,next)=>{ //route.get('/admin/add-product',(req,res,next)=>{

    console.log("middleware / add product get");
     res.sendFile(path.join(rootPath,'views','add-product.html'));   //rootpath = __dirname ,  "../"
    // res.send('<h1>WELCOME TO THE DIWANGA KINGDOME</h1> <form method = "POST" action="/admin/add-product"> <input name = "title" type="text"><button type="submit"> SEND</button></form>');
    // res.send('');
});

module.exports = route; 