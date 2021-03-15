const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController');
const TokenMiddleware = require('../middlewares/token/TokenMiddleware'); 

router.post('/api/v1/customers/create', CustomerController.create);
router.post('/api/v1/customers/login', CustomerController.login);

router.use('/api/v1/me', TokenMiddleware.verifyToken);
router.get('/api/v1/me', CustomerController.me);


module.exports = router;