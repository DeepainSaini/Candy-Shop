const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/',productController.getAddProductPage);
router.post('/',productController.addProduct);
router.get('/data',productController.getProducts);
router.put('/:id',productController.updateProductData);
router.delete('/:id',productController.deleteProduct);

module.exports = router;