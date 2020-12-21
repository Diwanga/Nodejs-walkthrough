const http = require('http');

const express = require('express');

const app =express();

app.use((req,res,next)=>{   //use is to givve middlewware to incomming requests. inside it is array of handlers.
   console.log("1 st middleware ");
   next();  //this helpps to jump to next middlware for this req

});
app.use((req,res,next)=>{
    console.log("2 st middleware ");
 
 });

// const routes = require('./routes');

// console.log(routes.someText);

const server = http.createServer(app);

server.listen(3000);
