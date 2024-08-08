import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register'
import Home from '../components/Home/Home'
import Admin from '../components/Admin/Admin'
import AdminLogin from '../components/AdminLogin/AdminLogin'
import ToDo from '../components/todo/ToDo';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/todo" element={<ToDo/>} />
      </Routes>
    </Router>
  );
}

export default App;
