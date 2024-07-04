const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

router.get('/', taskController.index);
router.get('/addTask', taskController.addTask);
router.post('/addTask', taskController.addTaskPOST);
router.get('/changeStatus/:id', taskController.changeStatus);
router.get('/deleteTask/:id', taskController.deleteTask);
router.get('/editTask/:id', taskController.editTask);
router.post('/editTask/:id', taskController.editTaskPOST);

module.exports = router;