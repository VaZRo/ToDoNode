const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/register', userController.register);
router.get('/login', userController.login);

module.exports = router;