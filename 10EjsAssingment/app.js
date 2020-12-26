const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine','ejs');
app.set('views','views');
app.use(bodyParser.urlencoded({extended: false}));

const routes = express.Router();
const userrout = require('./routes/users')

app.use(userrout.router);

app.get("/",(req,res,next)=>{
// res.send("<h1>asdasd</h1>")
res.render("dashbord",{title : "Dashbord"})
});


app.use("/",(req,res,next)=>{
 res.send("<h1>NO page sorryy</h1>")
// res.render("dashbord",{title : "Dashbord"})
});










app.listen(3000);