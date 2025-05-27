import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ExploreCareer.css';

const CareerSurvey = () => {  
  const [formData, setFormData] = useState({
    total_cgpa: '',
    logical_quotient_rating: '',
    hackathons: '',
    coding_skills_rating: '',
    public_speaking_points: '',
    can_work_long_time_before_system: '',
    self_learning_capability: '',
    certifications: '',
    reading_and_writing_skills: '',
    memory_capability_score: '',
    interested_subjects: '',
    interested_career_area: '',
    job_or_higher_studies: '',
    type_of_company_want_to_settle: '',
    interested_in_games: '',
    interested_type_of_books: '',
    salary_range_expected: '',
    gentle_or_tuff_behaviour: '',
    management_or_technical: '',
    worked_in_teams_ever: '',
    introvert: '',
  });

  const [prediction, setPrediction] = useState(null);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      await axios.post('http://127.0.0.1:8000/api/details/career-survey/', formData, {
        headers: { Authorization: `Token ${token}` },
      });
      const res = await axios.get('http://127.0.0.1:8000/api/details/predict-career/', {
        headers: { Authorization: `Token ${token}` },
      });
      setPrediction(res.data);
      navigate('/prediction', { state: { prediction: res.data } });
    } catch (err) {
      console.error(err);
      alert('Error during prediction. Check console.');
    }
  };

  const fieldMeta = {
    total_cgpa: { label: 'Total CGPA', placeholder: 'e.g. 7.5', type: 'number' },
    logical_quotient_rating: { label: 'Logical Quotient Rating (1-10)', placeholder: '1 to 10', type: 'number' },
    hackathons: { label: 'Hackathons Participated', placeholder: 'Number of hackathons', type: 'number' },
    coding_skills_rating: { label: 'Coding Skills Rating (1-10)', placeholder: '1 to 10', type: 'number' },
    public_speaking_points: { label: 'Public Speaking Points (1-10)', placeholder: '1 to 10', type: 'number' },
    can_work_long_time_before_system: { label: 'Can Work Long Time Before System', placeholder: 'Yes / No', type: 'text' },
    self_learning_capability: { label: 'Self Learning Capability', placeholder: 'High / Medium / Low', type: 'text' },
    certifications: { label: 'Certifications', placeholder: 'List of certifications', type: 'text' },
    reading_and_writing_skills: { label: 'Reading and Writing Skills', placeholder: 'Excellent / Good / Average', type: 'text' },
    memory_capability_score: { label: 'Memory Capability Score', placeholder: 'High / Medium / Low', type: 'text' },
    interested_subjects: { label: 'Interested Subjects', placeholder: 'e.g. AI, ML, Web Dev', type: 'text' },
    interested_career_area: { label: 'Interested Career Area', placeholder: 'e.g. Data Science, Full Stack', type: 'text' },
    job_or_higher_studies: { label: 'Job or Higher Studies', placeholder: 'Job / Higher Studies', type: 'text' },
    type_of_company_want_to_settle: { label: 'Type of Company Want to Settle', placeholder: 'Startup / MNC / Government', type: 'text' },
    interested_in_games: { label: 'Interested in Games', placeholder: 'Yes / No', type: 'text' },
    interested_type_of_books: { label: 'Interested Type of Books', placeholder: 'e.g. Fiction, Technical', type: 'text' },
    salary_range_expected: { label: 'Salary Range Expected', placeholder: 'e.g. 5-8 LPA', type: 'text' },
    gentle_or_tuff_behaviour: { label: 'Gentle or Tough Behaviour', placeholder: 'Gentle / Tough', type: 'text' },
    management_or_technical: { label: 'Management or Technical', placeholder: 'Management / Technical', type: 'text' },
    worked_in_teams_ever: { label: 'Worked in Teams Ever', placeholder: 'Yes / No', type: 'text' },
    introvert: { label: 'Introvert', placeholder: 'Yes / No', type: 'text' },
  };

  return (
    <div className="career-survey">
      <form onSubmit={handleSubmit}>
        <h2>Career Survey Form</h2>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="form-group">
            <label htmlFor={key}>{fieldMeta[key].label}</label>
            <input
              id={key}
              name={key}
              type={fieldMeta[key].type}
              placeholder={fieldMeta[key].placeholder}
              value={value}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>

      {prediction && (
        <div className="prediction-result">
          <h3>Predicted Career Category: {prediction.predicted_category}</h3>
          <h4>Possible Roles:</h4>
          <ul>
            {Array.isArray(prediction.suggested_roles) && prediction.suggested_roles.length > 0 ? (
              prediction.suggested_roles.map((role, i) => <li key={i}>{role}</li>)
            ) : (
              <li>No roles found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CareerSurvey;
