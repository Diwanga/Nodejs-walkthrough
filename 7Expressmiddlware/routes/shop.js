const express = require("express");
const path = require("path");

const route = express.Router();



route.get('/',(req,res,next)=>{

    console.log("middleware /");
    res.sendFile(path.join(__dirname,'../','views','shop.html'));
    // res.send('<h1>WELCOME TO THE DIWANGA KINGDOME</h1>');
    // res.send('');
});


module.exports = route;