const Task = require('../models/Task');
const User = require('../models/User');
const moment = require('moment');

exports.index = async(req, res) => {
    if(!req.session.userId){
        return res.redirect('/users/login');
    }
    try{
        const currentDateTime = moment().format('DD-MM-YYYY HH:mm:ss');
        var tasks = [];
        if(req.query.title){
            tasks = await Task.find({
                user: req.session.userId,
                title: { $regex: new RegExp(req.query.title, 'i')},
            })
        }
        else{
            tasks = await Task.find({ user: req.session.userId });
        }

        return res.render('taskViews/index', {tasks: tasks, currentDateTime: currentDateTime});
    } catch(error){
        console.error('Error fetching tasks: ', error);
        return res.status(500).send('Internal Server Error');
    }
}

exports.addTask = (req, res) => {
    if(!req.session.userId){
        return res.redirect('/users/login');
    }
    return res.render('taskViews/addTask');
}

exports.addTaskPOST = async(req, res) => {
    if (!req.session.userId) {
        return res.redirect('/users/login');
    }

    const { title } = req.body;

    if (!title) {
        return res.status(400).send('Title is required');
    }

    try {
        let task = new Task({ title: title, isComplete: false, user: req.session.userId });
        await task.save();
        res.redirect('/tasks/');
    } catch (error) {
        console.error('Error saving task:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.changeStatus = async(req, res) => {
    if(!req.session.userId){
        return res.redirect('/users/login');
    }

    const taskId = req.params.id;
    if (!taskId) {
        return res.status(400).send('TaskId is required');
    }

    try {
        let task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).send('Task not found');
        }

        task.isComplete = true;
        await task.save();

        res.redirect('/tasks/');
    } catch (error) {
        console.error('Error saving task:', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.deleteTask = async(req, res) => {
    const taskId = req.params.id;
    await Task.findByIdAndDelete(taskId);
    res.redirect('/tasks/');
}

exports.editTask = async(req, res) => {
    const task = await Task.findById(req.params.id);
    return res.render('taskViews/editTask', {task: task});
}

exports.editTaskPOST = async(req, res) => {
    const title = req.body.title;
    let isComplete = false;
    const taskId = req.params.id;
    const isCompleteCheckbox = req.body.isCompleteCheckbox;

    if (isCompleteCheckbox === 'on') {
        isComplete = true;
    }

    try{
        const editedTask = await Task.findById(taskId);
        editedTask.title = title;
        editedTask.isComplete = isComplete;
        await Task.findByIdAndUpdate(taskId, editedTask);
        res.redirect('/');
    } catch (error) {
        console.error('Error saving task:', error);
        res.status(500).send('Internal Server Error');
    }
}