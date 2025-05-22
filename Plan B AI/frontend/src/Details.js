import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Details.css'; // Import the CSS file here

function Details() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    college: '',
    degree: '',
    graduation_year: '',
    cgpa: '',
    skills: '',
    certifications: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = localStorage.getItem('authToken'); // Get token from localStorage
      if (!token) {
        setMessage('User is not authenticated. Please log in.');
        return;
      }

      const response = await axios.post(
        'http://127.0.0.1:8000/api/details/',
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setMessage('Details saved successfully!');
        setFormData({
          collegeName: '',
          degree: '',
          graduationYear: '',
          cgpa: '',
          skills: '',
          certifications: '',
        });
        navigate('/dashboard');
      }
    } catch (error) {
      setMessage('Failed to save details. Please try again.');
      console.error(error.response?.data || error);
    }
  };

  return (
    <div className="details-container">
      <h2>User Details</h2>
      <form onSubmit={handleSubmit} className="details-form">
        <input
          type="text"
          name="college"
          placeholder="College Name"
          value={formData.college}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="degree"
          placeholder="Degree"
          value={formData.degree}
          onChange={handleChange}
          required
          className="details-input"
        />
        <input
          type="number"
          name="graduation_year"
          placeholder="Passing Year"
          value={formData.graduation_year}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cgpa"
          placeholder="CGPA"
          value={formData.cgpa}
          onChange={handleChange}
          required
          className="details-input"
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills"
          value={formData.skills}
          onChange={handleChange}
          className="details-input"
        />
        <input
          type="text"
          name="certifications"
          placeholder="Certifications"
          value={formData.certifications}
          onChange={handleChange}
          className="details-input"
        />
        <button type="submit" className="details-button">Submit Details</button>
      </form>
      {message && <p className="details-message">{message}</p>}
    </div>
  );
}

export default Details;
