const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

let todos = [];

// Get all todos
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// Get a single todo by id
app.get('/api/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');
    res.json(todo);
});

// Add a new todo
app.post('/api/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        name: req.body.name,
        description: req.body.description,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Update a todo
app.put('/api/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');

    todo.name = req.body.name || todo.name;
    todo.description = req.body.description || todo.description;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;

    res.json(todo);
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) return res.status(404).send('Todo not found');

    const deletedTodo = todos.splice(todoIndex, 1);
    res.json(deletedTodo);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
