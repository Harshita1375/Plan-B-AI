# 🎓 Plan B AI – Intelligent Career Guidance System

**Plan B AI** is an an AI-powered personalized career guidance platform that leverages machine learning to help students make informed decisions about their future. By analyzing academic performance, interests, personality traits, and job market trends, it recommends tailored career paths.

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

## 💬 Career Counselor (AI-Powered)
Integrated Gemini LLM for natural language interaction
Personalized guidance and explanations for students' career queries
Chat-based interface embedded in the dashboard

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
- -**Large Language Model**: Gemini API

## Screenshot
![image](https://github.com/user-attachments/assets/6adab3aa-d2db-4107-9c84-3cbed59f2abe)
<br>
![image](https://github.com/user-attachments/assets/398c0377-d831-46e2-8654-abf41f87411a)
<br>
![image](https://github.com/user-attachments/assets/b1f32d48-70a2-4ecb-9c3e-884cdc2e8bef)
<br>
![image](https://github.com/user-attachments/assets/7c419665-3c05-4040-b02c-e519e6bc9130)

