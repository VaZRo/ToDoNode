const Task = require('../models/Task');

exports.index = async(req, res) => {
    if(!req.session.userId){
        return res.redirect('/users/register');
    }
    var tasks = [];
        return res.render('taskViews/index', {tasks: tasks});
}