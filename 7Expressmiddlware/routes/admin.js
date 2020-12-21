const express = require("express");

const route = express.Router();

route.post('/product',(req,res,next)=>{   //use wenuwata apita get post put delete pawihh krala req filter karanna puluwan

    console.log("middleware /users");
     console.log(req.body);
     res.redirect('/')
});
route.get('/add-product',(req,res,next)=>{

    console.log("middleware /");
    res.send('<h1>WELCOME TO THE DIWANGA KINGDOME</h1> <form method = "POST" action="/product"> <input name = "title" type="text"><button type="submit"> SEND</button></form>');
    // res.send('');
});

module.exports = route; 