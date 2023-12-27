import { useState } from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Task from "./components/Task";
import TodoApp from "./components/TodoApp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/task" element={<Task/>} />
        <Route path="/" element={<TodoApp/>} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
