import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './PredictPage.css';

const ChatGPT = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! Ask me about career paths, study tips, etc.' },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input.trim() };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('authToken');

      const response = await axios.post(
        'http://127.0.0.1:8000/api/details/chat/',
        { message: input.trim() },
        { headers: { Authorization: `Token ${token}`, 'Content-Type': 'application/json' } }
      );

      const botMsg = { sender: 'bot', text: response.data.reply || 'Sorry, no response.' };
      setMessages((msgs) => [...msgs, botMsg]);
    } catch(error) {
     console.error('ChatGPT API error:', error.response || error.message);
      setMessages((msgs) => [...msgs, { sender: 'bot', text: 'Error: Unable to get response.' }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">AI Career Counsellor</div>
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`chat-message ${m.sender}`}>
            {/* Use ReactMarkdown for bot messages, fallback to plain text for user */}
            {m.sender === 'bot' ? (
              <ReactMarkdown>{m.text}</ReactMarkdown>
            ) : (
              m.text
            )}
          </div>
        ))}
        {loading && <div className="chat-message bot">Typing...</div>}
      </div>
      <textarea
        className="chat-input"
        rows="2"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={sendMessage} disabled={loading} className="chat-send-btn">
        Send
      </button>
    </div>
  );
};

const PredictionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const prediction = location.state?.prediction || {
    predicted_category: 'No Prediction Found',
    suggested_roles: [],
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="prediction-result-wrapper">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <div className="prediction-result">
        <h2>Your Career Prediction</h2>
        <div className="highlight">{prediction.predicted_category}</div>
        <h3>Possible Roles</h3>
        <ul>
          {prediction.suggested_roles && prediction.suggested_roles.length > 0 ? (
            prediction.suggested_roles.map((role, idx) => <li key={idx}>{role}</li>)
          ) : (
            <li>No roles found</li>
          )}
        </ul>
      </div>

      <ChatGPT />
    </div>
  );
};

export default PredictionPage;
