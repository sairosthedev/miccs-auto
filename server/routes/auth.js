const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Logout (client should just delete token)
router.get('/logout', authController.logout);

// Get count of users
router.get('/count', authController.getUsersCount);

module.exports = router; 