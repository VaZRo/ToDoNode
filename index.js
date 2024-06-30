const express = require('express');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { type } = require('os');

const app = express();
const PORT = 3000;
const tasksFilePath = path.join(__dirname, 'files/tasks.json');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    fs.readFile(tasksFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Server Error');
        }

        let tasks = [];

        if(data){
            tasks = JSON.parse(data);
        }
        
        res.render('index', { tasks: tasks });
    });
});

app.post('/add-task', (req, res) => {
    if (!req.body) {
        return res.sendStatus(400);
    }
    let newTask = req.body;

    fs.readFile(tasksFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Server Error');
        }

        let lastId = 0
        let tasks = [];
        if(data){
            tasks = JSON.parse(data);
        }

        if(tasks.length != 0){
            lastId = tasks[tasks.length - 1].id;
        }
        newTask.id = ++lastId;
        tasks.push(newTask);

        fs.writeFile(tasksFilePath, JSON.stringify(tasks), 'utf-8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Server Error');
            }

            console.log('Task successfully added');
            res.redirect('/');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
