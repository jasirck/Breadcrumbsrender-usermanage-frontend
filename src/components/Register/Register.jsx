import React, { useState } from "react";
import axios from "../../axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        password2: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhone = (phone) => {
        const re = /^[0-9]+$/;
        return re.test(String(phone));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for empty fields
        for (let key in formData) {
            if (!formData[key]) {
                setError(`Please fill in all fields.`);
                return;
            }
        }

        // Check if passwords match
        if (formData.password !== formData.password2) {
            setError('Passwords do not match.');
            return;
        }

        // Validate email format
        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Validate phone number format
        if (!validatePhone(formData.phone)) {
            setError('Please enter a valid phone number.');
            return;
        }

        try {
            const response = await axios.post('register/', formData);
            console.log(response.data);
            navigate('/login');
        } catch (err) {
            if (err.response) {
                console.error('Server Error:', err.response.data);
                setError('Registration failed. Please try again.');
            } else if (err.request) {
                console.error('Network Error:', err.request);
                setError('Registration failed. Network error.');
            } else {
                console.error('Error:', err.message);
                setError('Registration failed. Please try again.');
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
                            onClick={() => setDarkMode(!darkMode)}
                            className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                        ></div>
                    </label>
                </div>
            </div>
            <div className={`xl:max-w-3xl ${darkMode ? "bg-black" : "bg-white"} w-full p-5 sm:p-10 rounded-md`}>
                <h1 className={`text-center text-xl sm:text-3xl font-semibold ${darkMode ? "text-white" : "text-black"}`}>
                    Register for a free account
                </h1>
                <form className="w-full mt-8" onSubmit={handleSubmit}>
                    <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? "bg-[#302E30] text-white focus:border-white" : "bg-gray-100 text-black focus:border-black"}`}
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <input
                            className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? "bg-[#302E30] text-white focus:border-white" : "bg-gray-100 text-black focus:border-black"}`}
                            type="text"
                            name="first_name"
                            placeholder="Enter your First Name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                        <input
                            className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? "bg-[#302E30] text-white focus:border-white" : "bg-gray-100 text-black focus:border-black"}`}
                            type="text"
                            name="last_name"
                            placeholder="Enter your Last Name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
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
                            type="tel"
                            name="phone"
                            placeholder="Enter your phone"
                            value={formData.phone}
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
                        <input
                            className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? "bg-[#302E30] text-white focus:border-white" : "bg-gray-100 text-black focus:border-black"}`}
                            type="password"
                            name="password2"
                            placeholder="Confirm Password"
                            value={formData.password2}
                            onChange={handleChange}
                        />
                        <button className="mt-5 tracking-wide font-semibold bg-gray-600 text-gray-100 w-full py-4 rounded-lg hover:bg-[#28acffd1]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span className="ml-3">Register</span>
                        </button>
                        {error && <p className="mt-2 text-red-500 text-center">{error}</p>}
                        <p className="mt-6 text-xs text-gray-600 text-center">
                            Already have an account?{" "}
                            <span className="text-[#1997e6] font-semibold cursor-pointer" onClick={() => navigate('/login')}>Login</span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
