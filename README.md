# 🎓 Plan B AI – Intelligent Career Guidance System

**Plan B AI** is a personalized career guidance platform that leverages machine learning to help students make informed decisions about their future. By analyzing a student's academic performance, interests, personality traits, and job market trends, Plan B AI recommends the most suitable career paths—whether that's pursuing higher education or entering the workforce.

---

## 🚀 Features

### ✅ Personalized Dashboard
- Intuitive dashboard for students to plan tasks and stay organized with a built-in to-do list.
- User-specific experience with persistent login sessions.

### 👤 Profile Page
- Fetches and displays complete student details from a PostgreSQL database.
- Allows viewing and updating academic and personal data.

### 🔐 Login & Registration System
- Secure authentication system with JWT-based login.
- Role-based access (students, admins, counselors – extendable).

### 🔍 Explore Career Page
- Interactive form that gathers:
  - Current CGPA
  - Area of interest
  - Preference for job or higher studies
  - Personality-based inputs
- Uses a pretrained **MLP (Multi-Layer Perceptron)** model trained on **32,000+ student records** to recommend:
  - Suitable career categories
  - Job roles based on industry demand (mapped via `job_categories.json`)

---

## 🧠 Machine Learning Model

- **Type**: MLP Classifier
- **Training Dataset**: 32,000+ anonymized student records
- **Preprocessing**:
  - `OneHotEncoder` for categorical data
  - `StandardScaler` for numeric fields
- **Output**: Career category prediction (e.g., Software Engineering, Data Science, Civil Services) with recommended job roles.

---

## 🛠 Tech Stack

- **Frontend**: React.js (Tailwind CSS for styling)
- **Backend**: Django + Django REST Framework
- **Database**: PostgreSQL
- **Machine Learning**: Scikit-learn (served via Django)
- **Authentication**: JSON Web Token
