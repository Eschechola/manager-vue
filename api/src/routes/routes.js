const database = require('../infraestructure/database/connection');
const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController');

router.post('/api/v1/customers/create', CustomerController.createCustomer);

module.exports = router;