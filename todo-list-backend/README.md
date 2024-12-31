# Project Structure

This project is a full-stack Todo List application built with React.js for the frontend and Node.js with Express.js and MongoDB for the backend. The app allows users to create, view, edit, and delete tasks, with data persisted in a database. The application uses a [front end](https://github.com/meenereem/todo-list-frontend) and a [back end server](https://github.com/meenereem/todo-list-backend) to handle requests and responses.

```
├── todo-list-frontend/    # Frontend with React.js
│   ├── src/               # Source code for the React app
│   │   ├── components/    # React components for UI
│   │   ├── App.jsx        # Main React component
│   │   └── main.jsx       # Entry point for React app
│   ├── store/             # Redux store and slices
│   │   └── store.js       # Redux store
│   │   └── todoSlice.js   # Redux slice for Todo app
│   └── package.json       # Frontend dependencies and scripts
├── todo-list-backend/     # Backend server with Node.js and Express
│   ├── server.js          # Main entry point for the server
│   ├── routes/            # Folder for Express route handlers
│   ├── models/            # MongoDB models
│   ├── controllers/       # Controllers for handling business logic
│   └── package.json       # Backend dependencies and scripts
```

# Steps to Run the Application

## 1. Clone the Repository

```bash
    git clone https://github.com/meenereem/todo-list-app
```

## 2. Install Dependencies

```bash
    cd todo-list-frontend
    npm install
    cd todo-list-backend
    npm install
```

## 3. Set Up Environment Variables
Before running the application, you'll need to create a .env file in the root of the backend directory. This file will store sensitive environment variables, such as your database connection string and any other necessary keys.

```
    MONGO_URI=mongodb://your-database-url
    PORT=5000
```

## 4. Run the Application

1. Start the backend server:

```bash
    cd todo-list-frontend
    npm run dev
    cd todo-list-backend
    npm start
```

# Task Features

The backend provides the following API endpoints for managing tasks:

* POST /todos: Add a new task.
* GET /todos: Retrieve all tasks.
* PUT /todos/:id: Update a task by ID (mark it as completed).
* DELETE /todos/:id: Delete a task by ID.

# CORS Configuration
The backend uses the CORS middleware to allow cross-origin requests from the frontend. 