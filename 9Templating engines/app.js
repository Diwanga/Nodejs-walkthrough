const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set("view engine",'pug');
app.set('views','views');//this is defalt. nt need

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
  
app.use(bodyParser.urlencoded({extended: false}));   //meken req.body kiyana eka fill karanawa
app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin', adminData.routes);
app.use(shopRoutes);
 
app.use((req, res, next) => {   //default tinn '/'
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404',{docTitle : "Page not found"})
});

app.listen(3000);
