import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "../../axios";
import { login } from '../../toolkit/slice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { isAuthenticated } = useSelector(state => state.usermanage);
useEffect(()=>{
  if (isAuthenticated){
    navigate('/')
  }
},[isAuthenticated, navigate])

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
     
      const { access, is_admin} = response.data;
      console.log(access);
      dispatch(login({'access':access,'is_admin':is_admin}));
      console.log(response);
      navigate('/');
    } catch (err) {
      if (err.response.data.error ==='Password Not Match') {
        console.error('Server Error:', err.response.data);
        setError(err.response.data.error);
      } else {
        console.error('Error:', err.message);
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh] bg-[#282D2D] px-5">
      <div className="flex flex-col items-end justify-start overflow-hidden mb-2 xl:max-w-3xl w-full">
        <div className="flex">
          <h3 className="text-white">Dark Mode: &nbsp;</h3>
          <label className="inline-flex relative items-center mr-5 cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={darkMode}
              readOnly
            />
            <div
              onClick={() => {
                setDarkMode(!darkMode);
              }}
              className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
            ></div>
          </label>
        </div>
      </div>
      <div
        className={`xl:max-w-3xl ${darkMode ? "bg-black" : "bg-white"} w-full p-5 sm:p-10 rounded-md`}
      >
        <h1
          className={`text-center text-xl sm:text-3xl font-semibold ${darkMode ? "text-white" : "text-black"}`}
        >
          Login to your account
        </h1>
        <form className="w-full mt-8" onSubmit={handleSubmit}>
          <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
            <input
              className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? "bg-[#302E30] text-white focus:border-white" : "bg-gray-100 text-black focus:border-black"}`}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? "bg-[#302E30] text-white focus:border-white" : "bg-gray-100 text-black focus:border-black"}`}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button className="mt-5 tracking-wide font-semibold bg-gray-700 text-gray-100 w-full py-4 rounded-lg hover:bg-gray-800 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
              <span className="ml-3">Login</span>
            </button>
            {error && <p className="mt-2 text-red-500 text-center">{error}</p>}
            <p className="mt-6 text-xs text-gray-600 text-center">
              Don't have an account?{" "}
              <span className="text-[#1997e6] font-semibold" onClick={() => { navigate('/register') }}>Register</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
