const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;
const db = 'mongodb+srv://tair:123@cluster0.ujpwbzm.mongodb.net/ToDoList?retryWrites=true&w=majority&appName=Cluster0';

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.redirect('/users/register');
})

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

mongoose.connect(db).then(() => {
    console.log('connected to db');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
}).catch((err) => {
    console.log(err);
})
