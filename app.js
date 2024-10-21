const express = require('express');
const app = express();
const port = 5000;

// Middleware to parse JSON request body
app.use(express.json());

// In-memory array to store to-do items
let todos = [];

// Routes
app.get('/health',(req,res)=>{
    res.status(200).send('Server ok!')
})
// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Get a specific todo by ID
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);

    if (todo) {
        res.json(todo);
    } else {
        res.status(404).send('Todo not found');
    }
});

// Create a new todo
app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1, // Auto-incrementing ID
        task: req.body.task,
        completed: false
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Update a todo
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);

    if (todo) {
        todo.task = req.body.task || todo.task;
        todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
        res.json(todo);
    } else {
        res.status(404).send('Todo not found');
    }
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);

    if (index !== -1) {
        todos.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Todo not found');
    }
});

// Start the server
const server = app.listen(port, () => {
    console.log(`Todo API listening at http://localhost:${port}`);
});
module.exports = { app, server };