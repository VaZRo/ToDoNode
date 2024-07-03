const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('This is User page');
})

module.exports = router;