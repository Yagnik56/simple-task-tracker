import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TaskList from "./components/TaskList";
import Home from "./components/Home";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tasks" element={<TaskList />} />
                {/* Add more routes as needed */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
