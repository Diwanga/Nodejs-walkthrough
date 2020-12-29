const path = require('path');

const express = require('express');

// const rootDir = require('../util/path');


const podutController = require('../controllers/product');

const router = express.Router();

router.get('/',podutController.getshopprroducts );

module.exports = router;
