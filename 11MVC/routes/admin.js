const path = require('path');

const express = require('express');

// const rootDir = require('../util/path');

const router = express.Router();

const productController = require('../controllers/product');



// /admin/add-product => GET
router.get('/add-product', productController.getadminpoducts);

// /admin/add-product => POST
router.post('/add-product', productController.postadminproducts);

exports.routes = router;

