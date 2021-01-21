const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI =
  'mongodb+srv://diwanga:qwerty123@cluster0.fkusz.mongodb.net/TTT';

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf(); 

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
 // when this passing, if req doesnot have sesid cookie, o cookie;s session id is not in db ,  it create new session id and attach session id cookie with encrypting session id in cokie withthe res it sent.
 // if it has cookie with seeein id that has in db , it will assing db session enty in eq ass req.session = db enty..
 //so we can access user session. 
  session({               
    secret: 'my secret',  // after log outt new session will assing and put to db .
    resave: false,        
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection); //
app.use(flash());  // add req.flash().  flash msg ae store in sesssion. in database

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn; //  tell express js  we want send this data in every renders vieew.. res local data
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI,{ useNewUrlParser: true ,useUnifiedTopology: true })
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
