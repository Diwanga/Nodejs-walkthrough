const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); //mo

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use((req, res, next) => {
  User.findById('600567d719dc7c46042f52cd')
    .then(user => {
      req.user = user;  // meka mongoose object ekak. ona methd ekakcall kn aki
      next();
    })
    .catch(err => console.log(err));
});

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://diwanga:qwerty123@cluster0.fkusz.mongodb.net/mongooseDB?retryWrites=true&w=majority'
  ,
  {useNewUrlParser: true, useUnifiedTopology: true})
  .then(result => {
    // console.log(result)
   User.findOne().then(user =>{
     if(!user){   
        const user = new User({
          name : 'diwanga',
          email : 'diwangaamasith@gmaill.com' ,
          cart : {
            items : []
          }    
        })
        user.save();
     }
   })
  }).then(()=>{

    app.listen(3000);
  }
    
  )
  .catch(err => {
    console.log(err);
  });
