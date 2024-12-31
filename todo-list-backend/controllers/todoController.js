const Todo = require('../models/todoModel');

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch todos' });
    }
};

const addTodo = async (req, res) => {
    try {
        const newTodo = new Todo({
            text: req.body.text,
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add todo' });
    }
};

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const todo = await Todo.findByIdAndUpdate(id, { text }, { new: true });
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update todo' });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndDelete(id);
        res.status(200).json({ message: 'Deleted todo' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete todo' });
    }
};

const toggleTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        todo.completed = !todo.completed;
        await todo.save();
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Failed to toggle todo' });
    }
};

module.exports = { getTodos, addTodo, updateTodo, deleteTodo, toggleTodo };
