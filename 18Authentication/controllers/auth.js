const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0]; // multiiple flash msg in array
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message // flashig msg
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }) 
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password.'); // add msg to flash
        return res.redirect('/login');
      }
      bcrypt       // only can encipting. so log pw again encrpt and see wether it same 
        .compare(password, user.password)
        .then(doMatch => { //1 o 0 
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => { // new session is added to database
              console.log(err);
              res.redirect('/');            // session id cookie is sen with this
            });
          }
          req.flash('error', 'Invalid email or password.'); // flash msg loaded
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        req.flash('error', 'E-Mail exists already, please pick a different one.');
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12) //12 is secuer
        .then(hashedPassword => {
          const user = new User({  // hee no validation done
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();  // user save to db
        })
        .then(result => {
          res.redirect('/login');
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
