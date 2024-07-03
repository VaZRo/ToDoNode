const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/register', userController.register);
router.post('/register', userController.registerPOST);
router.get('/login', userController.login);
router.post('/login', userController.loginPOST);
router.get('/logout', userController.logout);

module.exports = router;