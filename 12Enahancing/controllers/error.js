exports.get404 = (req, res, next) => { //default  '/'
    res.status(404).render('404', { pageTitle: 'Page Not Found' ,path : "Nobutneed"});
  };