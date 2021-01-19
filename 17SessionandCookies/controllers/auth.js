const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('600716db4629bf38f8f1336e')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;  // methnadi db ekata liyanawa
      req.session.save(err => {  // eeth eka wenna wela yanawa. eee athae '/' rende unoth  log wen ne. ee  nisa eq.session.save() eken db ekatasave karala thmai redirect wenne
        console.log(err);
        res.redirect('/');
      });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => { // mehni db eke session eka delete wenawa. eeth browse eke ne. alk ne. 
    console.log(err);
    res.redirect('/');
  });
};
// IMPORTANT
// session middleware eken mulinma req eke indn ena session id encrypt kpu cookie eka decypt karala req.session ekata eeka attah karanawa.
// eeta passe req.session.xxx = xx  wens kara gmn save wenawa db ekatta.  wela mokak hai akranawanam req.session.save() karanawa.
