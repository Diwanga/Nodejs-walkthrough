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
  'mongodb+srv://diwanga:qwerty123@cluster0.fkusz.mongodb.net/TEST';

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
  session({
    secret: 'my secret', // session id enipt code
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection); // csrf midlware  this add req.csrf()
app.use(flash());   // flash middlware. this add req.flash() . use session to flash mesages. messages after enderd it will emove fom session

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user; // to invoke mongoos function
      next();
    })
    .catch(err => console.log(err));
});

app.use((req, res, next) => {   // local vaiables wich added to every view
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken(); // evey view diffeent view
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI , { useUnifiedTopology: true ,useNewUrlParser: true })
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
