const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('Failed to connect to MongoDB:', error));

// Routes
app.use('/todos', todoRoutes);

// Server Listener
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
