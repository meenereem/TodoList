import TodoApp from "./components/TodoApp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<TodoApp />} />
            </Routes>
        </Router>
    )
}

export default App;