const express = require('express');
const carController = require('../controllers/carController');
const { auth, role } = require('../middleware/auth');

const router = express.Router();

// Get all cars
router.get('/', carController.getAllCars);

// Get car by ID
router.get('/:id', carController.getCarById);

// Add car (admin only)
router.post('/', auth, role('admin'), carController.addCar);

// Edit car (admin only)
router.put('/:id', auth, role('admin'), carController.editCar);

// Delete car (admin only)
router.delete('/:id', auth, role('admin'), carController.deleteCar);

// Get shareable link for a car
router.get('/share/:carId', carController.getShareLink);

module.exports = router; 