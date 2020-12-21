// const http = require('http');

const express = require('express');

const app =express();

app.use((req,res,next)=>{   //use is to givve middlewware to incomming requests. inside it is array
   console.log("1 st middleware ");
   next();  //this helpps to jump to next middlware for this req

});
app.use((req,res,next)=>{

    console.log("2 st middleware ");
    console.log('This is middleware', req.originalUrl);
    res.send("<h1>hEY FROM eXPRESS JS</h1>")
 });


// const routes = require('./routes');

// console.log(routes.someText);

// const server = http.createServer(app);

// server.listen(3000);

app.listen(3000);
