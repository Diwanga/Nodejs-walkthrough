const express = require('express');

const app = express();

app.use('/',(req,res,next)=>{

    console.log("initial");
    // console.log(req);
    next();
});
app.use('/users',(req,res,next)=>{

    console.log("middleware /users");
    // console.log(req);
});

app.use('/',(req,res,next)=>{

    console.log("middleware /");
    res.send('<h1>WELCOME TO THE DIWANGA KINGDOME</h1> <form action="/users"> <input type="text"><button type="submit"> SEND</button></form>');
    // res.send('');
});
app.listen(3000);