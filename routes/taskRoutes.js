const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello world this is tasks page");
})

module.exports = router;