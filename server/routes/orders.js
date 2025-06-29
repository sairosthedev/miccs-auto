const express = require('express');
const orderController = require('../controllers/orderController');
const { auth, role } = require('../middleware/auth');

const router = express.Router();

// Place order (customer)
router.post('/', auth, orderController.placeOrder);

// Get all orders (admin only)
router.get('/', auth, role('admin'), orderController.getAllOrders);

// Get orders for a user
router.get('/user/:id', auth, orderController.getUserOrders);

// Get count of completed sales/orders
router.get('/count/completed', orderController.getCompletedSalesCount);

module.exports = router; 