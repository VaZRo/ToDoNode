const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

router.get('/', (req, res) => {
    var tasks = [];
    res.render('taskViews/index', {tasks: tasks});
})

module.exports = router;