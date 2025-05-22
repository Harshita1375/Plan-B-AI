import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

// Move quotes array outside the component
const quotes = [
  "The best way to get started is to quit talking and begin doing.",
  "Don't let yesterday take up too much of today.",
  "It's not whether you get knocked down, it's whether you get up.",
  "If you are working on something exciting, it will keep you motivated.",
  "Success is not in what you have, but who you are.",
];

function Dashboard() {
  const navigate=useNavigate();
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []); // no dependencies, runs once on mount

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput('');
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleProfile=(index) =>{
    navigate('/profile');
  }
  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="dashboard-wrapper">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="navbar-logo">Dashboard</h2>
        <div className="navbar-links">
          <button onClick={handleProfile}>Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Left Column - To-Do */}
        <div className="left-panel">
          <p className="dashboard-date">{new Date().toDateString()}</p>


          <h3>To-Do List</h3>
          <div className="todo-input">
            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Add a task"
            />
            <button onClick={addTask}>+</button>
          </div>
          <ul className="todo-list">
            {tasks.map((task, index) => (
              <li key={index} className={task.completed ? 'completed' : ''}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(index)}
                />
                <span>{task.text}</span>
                <button onClick={() => removeTask(index)}>🗑️</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="right-panel">
          {/* Random quote */}
          <div className="random-quote" style={{ margin: '1rem 0', fontStyle: 'italic' }}>
            "{quote}"
          </div>

          <div className="dashboard-section">
            <h3>Learning Path</h3>
            <p>Get recommended learning paths based on your goals.</p>
          </div>

          <div className="dashboard-section">
            <h3>Career Options</h3>
            <p>Explore careers based on your skills and education.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
