const express = require('express');
const carController = require('../controllers/carController');
const { auth, role } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

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

// Upload car images (admin only)
router.post('/upload-images', auth, role('admin'), upload.array('images', 10), (req, res) => {
  // Return URLs for uploaded images
  const files = req.files;
  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
  const urls = files.map(file => `/uploads/${file.filename}`);
  res.json({ urls });
});

// Get count of available cars
router.get('/count/available', carController.getAvailableCarsCount);

module.exports = router; 