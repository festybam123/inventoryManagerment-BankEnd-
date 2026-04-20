const fakeStoreController = require('../controllers/fakeStoreController');
const authmiddleware = require('../model/midleware/authorizeMiddleware');
const express = require('express');
const router = express.Router();

// Define routes
router.get('/products', fakeStoreController.getProducts);
router.get('/products/:id', fakeStoreController.getProduct);
router.post('/products', fakeStoreController.createProduct);

module.exports = router;