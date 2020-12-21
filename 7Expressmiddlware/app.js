const express = require('express');
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

const parser = require('body-parser')
const app = express();

app.use(parser.urlencoded({extended : true}));   //okkomaa req gannawa.   / which have onlu ulencoded
app.get('/favicon.ico', (req, res) => res.status(204));


app.use('/admin',adminRoute); // req  filtering 
app.use(shopRoute);

app.use((req,res,next)=>{    // methana thinne "/"   meka default.
  res.status(404).send('<h1>Page Not Found</h1>')
});

// as we use get in shop.js. we can swich 

// app.use(shopRoute);
// app.use(adminRoute);


app.listen(3000);