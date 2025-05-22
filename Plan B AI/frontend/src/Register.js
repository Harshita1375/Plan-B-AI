import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    re_password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // 1. Register the user
      await axios.post('http://127.0.0.1:8000/api/auth/users/', formData);

      // 2. Login the user and get token
      const loginData = {
        email: formData.email,
        password: formData.password
      };

      const loginResponse = await axios.post('http://127.0.0.1:8000/api/auth/token/login/', loginData);

      const token = loginResponse.data.auth_token;

      // 3. Store token in localStorage
      localStorage.setItem('authToken', token);

      alert('Registration successful!');
      
      // 4. Redirect to details page
      navigate('/details');
    } catch (error) {
      alert('Registration failed!');
      console.error(error.response?.data || error);
    }
  };

  return (
    <div className="register-container">
      <h2>Create Account</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="re_password"
          placeholder="Confirm Password"
          value={formData.re_password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
