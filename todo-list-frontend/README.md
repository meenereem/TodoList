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
```

# Steps to Run the Application

## 1. Clone the Repository

```bash
    git clone https://github.com/meenereem/todo-list-frontend
    cd todo-list-frontend
```

## 2. Install Dependencies

```bash
    npm install
```

## 3. Run the Application

1. Start the frontend:

```bash
    npm run dev
```

# Task Features

Mark tasks as completed/uncompleted: When a user clicks on a task, it will be marked as completed with a line-through effect to visually indicate that the task is finished.

# CORS Configuration
The backend uses the CORS middleware to allow cross-origin requests from the frontend. 