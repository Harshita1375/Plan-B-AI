import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // assuming react-router
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://127.0.0.1:8000/api/profile/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-page">
      <div className="button-group">
        <button className="back-button" onClick={handleBack}>← Back</button>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <div className="profile-container">
        <h2>My Profile</h2>
        <div className="profile-card">
          <p><strong>Username:</strong> {profile.email}</p>
          <p><strong>Email:</strong> {profile.email}</p>

          {profile.details && (
            <>
              <h3>Education</h3>
              <p><strong>College:</strong> {profile.details.college}</p>
              <p><strong>Degree:</strong> {profile.details.degree}</p>
              <p><strong>Graduation Year:</strong> {profile.details.graduation_year}</p>
              <p><strong>CGPA:</strong> {profile.details.cgpa}</p>
              <h3>Skills</h3>
              <p>{profile.details.skills}</p>
              <h3>Certifications</h3>
              <p>{profile.details.certifications}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
