const path = require('path');

const express = require('express');

// const rootDir = require('../util/path');


const shopcontroller = require('../controllers/shop');

const router = express.Router();

router.get('/',shopcontroller.getindex );
router.get('/products',shopcontroller.getshopprroducts );
router.get('/cart', shopcontroller.getcart);
router.get('/checkout',shopcontroller.getcheckout);

module.exports = router;
