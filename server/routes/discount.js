const express = require('express');
const discountController = require('../controllers/discountController');
const { auth, role } = require('../middleware/auth');

const router = express.Router();

// Set discount (admin only)
router.post('/:carId', auth, role('admin'), discountController.setDiscount);

// Update discount (admin only)
router.put('/:carId', auth, role('admin'), discountController.updateDiscount);

module.exports = router; 