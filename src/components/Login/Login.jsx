import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "../../axios";
import { login,dark_mode_change } from '../../toolkit/slice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [darkMode, setDarkMode] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { isAuthenticated,dark_mode } = useSelector(state => state.usermanage);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('login/', formData);
      const { access, is_admin } = response.data;
      dispatch(login({ access, is_admin }));
      navigate('/');
    } catch (err) {
      if (err.response?.data?.error === 'Password Not Match') {
        setError(err.response.data.error);
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  const adminlogin = () => {
    navigate('/adminlogin');
  };

  return (
    <div className={`flex flex-col justify-center items-center w-full h-screen px-5 ${dark_mode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="flex flex-col items-end justify-start overflow-hidden mb-4 w-full">
        <div className="flex items-center">
          <h3 className={`text-lg font-medium ${dark_mode ? 'text-teal-200' : 'text-teal-800'}`}>Dark Mode</h3>
          <button
            className={`absolute top-4 left-4 text-sm font-semibold py-1 px-2 rounded-md ${dark_mode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} transition-colors duration-300`}
            onClick={adminlogin}
          >
            Admin
          </button>
          <label className="inline-flex items-center cursor-pointer ml-3">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={dark_mode}
              readOnly
            />
            <div
              onClick={() => dispatch(dark_mode_change())}
              className={`w-12 h-6 rounded-full ${dark_mode ? 'bg-teal-600' : 'bg-gray-300'} relative cursor-pointer transition-colors duration-300`}
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform ${dark_mode ? 'translate-x-6' : ''}`}
              ></div>
            </div>
          </label>
        </div>
      </div>
      <div
        className={`xl:max-w-md ${dark_mode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} w-full p-6 sm:p-8 rounded-lg shadow-lg relative`}
      >
        <h1
          className={`text-center text-2xl sm:text-3xl font-semibold ${dark_mode ? 'text-white' : 'text-gray-800'}`}
        >
          Login to your account
        </h1>
        <form className="w-full mt-8" onSubmit={handleSubmit}>
          <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-5">
            <input
              className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none ${dark_mode ? 'bg-gray-700 text-white placeholder-gray-400 focus:border-teal-500' : 'bg-gray-100 text-gray-800 focus:border-teal-500'}`}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none ${dark_mode ? 'bg-gray-700 text-white placeholder-gray-400 focus:border-teal-500' : 'bg-gray-100 text-gray-800 focus:border-teal-500'}`}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              className={`mt-6 tracking-wide font-semibold py-4 rounded-lg ${dark_mode ? 'bg-teal-600 text-white hover:bg-teal-700' : 'bg-teal-500 text-white hover:bg-teal-600'} transition-colors duration-300`}
            >
              Login
            </button>
            {error && <p className="mt-3 text-red-500 text-center">{error}</p>}
            <p className="mt-6 text-sm text-gray-600 text-center">
              Don't have an account?{" "}
              <span className="text-teal-500 font-semibold cursor-pointer" onClick={() => navigate('/register')}>Register</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;


