const express = require('express');
const router = express.Router();
const TokenMiddleware = require('../middlewares/token/TokenMiddleware'); 

const CustomerController = require('../controllers/CustomerController');
const ProductController = require('../controllers/ProductController');

//Customers
router.post('/api/v1/customers/create', CustomerController.create);
router.post('/api/v1/customers/login', CustomerController.login);

router.use('/api/v1/me', TokenMiddleware.verifyToken);
router.get('/api/v1/me', CustomerController.me);

//Products
router.use('/api/v1/products/create', TokenMiddleware.verifyToken);
router.post('/api/v1/products/create', ProductController.create);

router.use('/api/v1/products/get-by-id/:id', TokenMiddleware.verifyToken);
router.get('/api/v1/products/get-by-id/:id', ProductController.getById);

router.use('/api/v1/products/search-by-name', TokenMiddleware.verifyToken);
router.get('/api/v1/products/search-by-name', ProductController.searchByName);

router.use('/api/v1/products/delete/:id', TokenMiddleware.verifyToken);
router.delete('/api/v1/products/delete/:id', ProductController.delete);

router.use('/api/v1/products/update', TokenMiddleware.verifyToken);
router.patch('/api/v1/products/update', ProductController.update);

module.exports = router;