const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // This serves your HTML

const DATA_FILE = './tasks.json';

// Get all tasks from the file
app.get('/api/tasks', (req, res) => {
    if (!fs.existsSync(DATA_FILE)) return res.json([]);
    const data = fs.readFileSync(DATA_FILE);
    res.json(JSON.parse(data));
});

// Save a new task to the file
app.post('/api/tasks', (req, res) => {
    const tasks = fs.existsSync(DATA_FILE) ? JSON.parse(fs.readFileSync(DATA_FILE)) : [];
    tasks.push(req.body.task);
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks));
    res.status(201).send();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;