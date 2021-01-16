const path = require('path');
const sequelize = require("./util/database");
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');


const express = require('express');
const app = express();
const bodyParser = require('body-parser');



const errorController = require('./controllers/error');
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req,res,next)=>{
    // req.user = findByPk(1)// me wage ewa bee.. mewa promiz
    User.findByPk(1)
    .then(user=>{
        // user.cre
        req.user = user; // req eke user kiyla ekak ne, e nisa danna aki. body wage ewata danna yn epa
  //methna user kiynne seulize object ekak. godak methd walin wedak ganna aki.
  next();
    })
    .catch(err=>{
        console.log(err);
    });
 

});

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { findByPk } = require('./models/product');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//ADDING Assosiations
//me dekama relations ona
Product.belongsTo(User,{constraints:true ,onDelete: "CASCADE"})
User.hasMany(Product);
// User.hasMany(Product); uda ekamai. deweni widiya liyana

User.hasOne(Cart);  //one to ona
Cart.belongsTo(User);  // use key will add to cart

Product.belongsToMany(Cart,{through:CartItem});  // many to many relation
Cart.belongsToMany(Product,{through:CartItem});  // many to many ekak meda table ekak tinna ona


//we want to sync DB when i start server, if not ctreate , create, if created, dont create
// methanadi define() kiyala hadapu model wala table thmai gnne
// sequelize.sync({force:true}) // forse kare uda relation add krnna , relplace krna. apahu hadanna. den aluthinma hedenawa.
sequelize
// .sync({force :true})
.sync()   
.then(result=> {
     return User.findByPk(1);
    // console.log(result);
    // app.listen(3000);
}).then(user=>{
if(!user){
    return User.create({name :"DIWANGI" , email :"diwangaamasith@gmail.com"})
}
return user;  //Promis ekakain return wenna ona ekama ekak. methna user kiynne java script object eekak. 
//uda eka promis ekak. api ema nm 
// return Promise.resolve(user) danna ona.  HABAI then block ekakin return wena ekakata komath promis  wrap karana nisa on ne danna mema.
})
.then(user =>{
    
    // return user.createCart();
})
.then(cart=>{
    console.log("jiksddddddddddddddddddddddddddddddddddddddddddddddddd");
    const model = Cart
    for (let assoc of Object.keys(model.associations)) {
        for (let accessor of Object.keys(model.associations[assoc].accessors)) {
            console.log(model.name + '.' + model.associations[assoc].accessors[accessor]+'()');
        }
    }
    console.log("jiksddddddddddddddddddddddddddddddddddddddddddddddddd");
    app.listen(3000);
})

.catch(err=>{
    
    console.log(err);
});

