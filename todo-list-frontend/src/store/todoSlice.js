import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        list: [],
        status: 'idle',
        error: null
    },
    reducers: {
        pushTodo: (state, action) => {
            state.list.push(action.payload);
        },
        setTodos: (state, action) => {
            state.list = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        editTodo: (state, action) => {
            const todo = state.list.find(todo => todo._id === action.payload._id);
            if (todo) {
                todo.text = action.payload.text;
            }
        },
        removeTodo: (state, action) => {
            state.list = state.list.filter(todo => todo._id != action.payload);
        }
    }
})

export const { pushTodo, setTodos, setStatus, setError, editTodo, removeTodo } = todoSlice.actions;

export const deleteTodo = (id) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:5000/todos/${id}`);
        dispatch(removeTodo(id));
    }
    catch {
        dispatch(setError('failed to delete todo'));
    }
}

export const addTodo = (text) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/todos', {text});
        dispatch(pushTodo(response.data));
    }
    catch {
        dispatch(setError('failed to add todo'));
    }
}

export const updateTodo = (id, text) => async (dispatch) => {
    try {
        const response = await axios.put(`http://localhost:5000/todos/${id}`, {text});
        dispatch(editTodo(response.data));
    }
    catch {
        dispatch(setError('failed to edit todo'));
    }
}

export const toggleTodo = (id) => async (dispatch) => {
    try {
        await axios.put(`http://localhost:5000/todos/${id}/toggle`);
        dispatch(fetchTodos());
    }
    catch {
        dispatch(setError('failed to toggle todo'));
    }
}


export const fetchTodos = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:5000/todos');
        dispatch(setTodos(response.data));
        dispatch(setStatus('Success'));
    }
    catch {
        dispatch(setStatus('Failed'));
        dispatch(setError('failed to fetch todos'));
    }
}

export default todoSlice.reducer;