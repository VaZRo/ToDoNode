const User = require('../models/User');

exports.register = async(req, res) => {
    const error = 'This user already exist'
    res.render('userViews/register', { error: error });
}

exports.registerPOST = async(req, res) => {
    const { login, password } = req.body;
    if(User.findOne(login)){
        res.redirect('/users/register');
    }
    
}

exports.login = async(req, res) => {
    res.render('userViews/login');
}