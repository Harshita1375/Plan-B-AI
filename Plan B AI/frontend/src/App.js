import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Details from './Details';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />        {/* 👈 Default route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;