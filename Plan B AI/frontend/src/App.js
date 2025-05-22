import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Details from './Details';
import Dashboard from './Dashboard';
import Profile from './Profile';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/details" element={<Details />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;