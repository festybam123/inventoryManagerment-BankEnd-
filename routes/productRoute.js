const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//bring in the multer middleware
const { protect } = require('../model/midleware/authorizeMiddleware');
const { authorize } = require('../model/midleware/roleMiddleware');

// no authentication here
router.post('/products', protect, authorize('admin'), productController.createProduct);
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.patch('/upload-image/:id', productController.updateImage);
router.post('/createProductwithmail', protect, authorize('admin'), productController.createProductwithmail);


module.exports = router;