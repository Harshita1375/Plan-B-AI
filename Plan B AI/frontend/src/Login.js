import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';



function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/token/login/', {
        email,
        password,
      });

      const token = response.data.auth_token;
      localStorage.setItem('authToken', token);
      //setMessage('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      const errorMsg = error.response?.data?.non_field_errors?.[0] || 'Login failed. Please check your credentials.';
      setMessage(errorMsg);
      console.error('Login error:', error.response?.data || error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <div className="switch-form">
        Don't have an account? <a href="/register">Register</a>
      </div>
    </div>
  );
}

export default Login;