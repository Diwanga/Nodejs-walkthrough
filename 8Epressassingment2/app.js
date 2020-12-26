const express = require('express');
const path = require("path");


const app = express();

app.use(express.static(path.join(__dirname,'public')));
app.use('/user',(req,res,next )=>{
    // res.send("<h1>DIWANNNGA AMSITH KARIYWASAM</h1>");
    res.sendFile(path.join(__dirname,'views','main.html'));
  });
  
app.use("/",(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','second.html'));
});



app.listen(3000);

