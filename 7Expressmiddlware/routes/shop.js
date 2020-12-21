const express = require("express");

const route = express.Router();



route.get('/',(req,res,next)=>{

    console.log("middleware /");
    res.send('<h1>WELCOME TO THE DIWANGA KINGDOME</h1>');
    // res.send('');
});


module.exports = route;