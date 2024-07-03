const User = require('../models/User');

exports.register = async(req, res) => {
    res.render('userViews/register');
}