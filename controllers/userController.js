const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRound = 10;

exports.register = async(req, res) => {
    if(req.session.userId){
        return res.redirect('/tasks/');
    }
    return res.render('userViews/register');
}

exports.registerPOST = async(req, res) => {
    if(req.session.userId){
        return res.redirect('/tasks/');
    }
    const { login, password } = req.body;

    try{
        const existingUser = await User.findOne({ login });
        if(existingUser){
            return res.status(400).json({ error: 'Login is already taken' });
        }
    
        const hashedPassword = await bcrypt.hash(password, saltRound);
        const newUser = new User({ login: login, password: hashedPassword });
        await newUser.save();
        return res.status(200).json({ redirectUrl: '/users/login' });
    } catch(error) {
        res.status(500).json({ error: 'Internal server error '})
    }
}

exports.login = async(req, res) => {
    if(req.session.userId){
        return res.redirect('/tasks/');
    }
    return res.render('userViews/login');
}

exports.loginPOST = async(req, res) => {
    if(req.session.userId){
        return res.redirect('/tasks/');
    }
    const { login, password } = req.body;

    try{
        const user = await User.findOne({ login });

        if(!user){
            return res.status(400).json({ error : 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        req.session.userId = user._id;
        return res.status(200).json({ redirectUrl: '/tasks/' });
    } catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.logout = (req, res) => {
    if(!req.session.userId){
        res.redirect('/users/login');   
    }
    req.session.destroy(err => {
        if(err) return res.status(500).send("Logout Error");
    })
    res.redirect('/users/login');
}
