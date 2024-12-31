import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchTodos, setError, toggleTodo, updateTodo, deleteTodo } from '../store/todoSlice';
import './TodoApp.css';

const TodoApp = () => {
    const [text, setText] = useState('');
    const [editText, setEditText] = useState('');
    const [editId, setEditID] = useState(null);
    const [filter, setFilter] = useState('All');
    const [sortOrder, setSortOrder] = useState('Ascending');
    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage, setTodosPerPage] = useState(5);
    const todos = useSelector(state => state.todos.list);
    const error = useSelector(state => state.todos.error);
    const status = useSelector(state => state.todos.status);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    },[dispatch])

    const handleAddTodo = () => {
        if (text.trim()) {
            dispatch(addTodo(text));
            setText('');
        }
        else {
            dispatch(setError('todo cannot be empty'));
        }
    }

    const handleToggle = (id) => {
        dispatch(toggleTodo(id));
    }

    const handleUpdateTodo = (id) => {
        dispatch(updateTodo(id, editText))
        setEditID(null);
    }

    const handleEditTodo = (todo) => {
        setEditID(todo._id);
        setEditText(todo.text);
    }

    const handleDeleteTodo = (id) => {
        dispatch(deleteTodo(id));
        if ((filteredTodos.length-1) % todosPerPage === 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const filteredTodos = todos.filter(todo => {
        if (filter === 'In Progress') {
            return !todo.completed;
        }
        if (filter === 'Completed') {
            return todo.completed;
        }
        return true;
    })

    const sortedTodos = [...filteredTodos].sort((a,b) => {
        if (sortOrder === 'Ascending') {
            return a.text.localeCompare(b.text);
        }
        if (sortOrder === 'Descending') {
            return b.text.localeCompare(a.text);
        }
    })

    const handleSortTodos = () => {
        sortOrder === 'Ascending' ? setSortOrder('Descending') : setSortOrder('Ascending');
    }

    const lastIndex = currentPage * todosPerPage;
    const firstIndex = lastIndex - todosPerPage;
    const currentTodos = sortedTodos.slice(firstIndex, lastIndex);

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const handleFilterTodos = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
    }

    return (
        <div className='container'>
            <h1>Todo App</h1>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={handleAddTodo}>Add</button>
            <select onChange={(e) => handleFilterTodos(e)}>
                <option value='All'>All</option>
                <option value='In Progress'>In Progress</option>
                <option value='Completed'>Completed</option>
            </select>
            <button onClick={handleSortTodos}>{sortOrder === 'Ascending' ? 'Ascending' : 'Descending'}</button>
            <ul>
                {currentTodos.map(todo => (
                    <li key={todo._id}>
                        {editId === todo._id ? (
                            <>
                                <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
                                <button onClick={() => handleUpdateTodo(todo._id)}>Save</button>
                                <button onClick={() => setEditID(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <span
                                    onClick={() => handleToggle(todo._id)}
                                    style={{textDecoration: todo.completed ? 'line-through' : 'none' }}
                                >
                                    {todo.text}
                                </span>
                                <button onClick={() => handleEditTodo(todo)}>Edit</button>
                                <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
                            </>
                        )}
                        
                    </li>
                ))}
            </ul>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
            <button onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredTodos.length/todosPerPage) }>Next</button>
            {status === 'Failed' && <p>...Failed to fetch todos</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    )
}

export default TodoApp;