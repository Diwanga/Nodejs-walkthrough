const path = require('path');

const express = require('express');

// const rootDir = require('../util/path');

const router = express.Router();

const adminController = require('../controllers/admin');



// /admin/add-product => GET
router.get('/add-product', adminController.getaddpoducts);
router.get('/products',adminController.getpoducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postaddproducts);

exports.routes = router;

