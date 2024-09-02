import React, { useState } from "react";
import axios from "../../axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dark_mode_change } from '../../toolkit/slice';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { dark_mode } = useSelector(state => state.usermanage);

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
        <div className={`flex flex-col justify-center items-center w-full h-screen px-5 ${dark_mode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <div className="flex flex-col items-end justify-start overflow-hidden mb-4 w-full">
                <div className="flex items-center">
                    <h3 className={`text-lg font-medium ${dark_mode ? 'text-teal-200' : 'text-teal-800'}`}>Dark Mode</h3>
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
                className={`xl:max-w-3xl ${dark_mode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} w-full p-6 sm:p-8 rounded-lg shadow-lg relative`}
            >
                <h1
                    className={`text-center text-2xl sm:text-3xl font-semibold ${dark_mode ? 'text-white' : 'text-gray-800'}`}
                >
                    Register for a free account
                </h1>
                <form className="w-full mt-8" onSubmit={handleSubmit}>
                    <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-5">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none ${dark_mode ? 'bg-gray-700 text-white placeholder-gray-400 focus:border-teal-500' : 'bg-gray-100 text-gray-800 focus:border-teal-500'}`}
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <input
                            className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none ${dark_mode ? 'bg-gray-700 text-white placeholder-gray-400 focus:border-teal-500' : 'bg-gray-100 text-gray-800 focus:border-teal-500'}`}
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                        <input
                            className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none ${dark_mode ? 'bg-gray-700 text-white placeholder-gray-400 focus:border-teal-500' : 'bg-gray-100 text-gray-800 focus:border-teal-500'}`}
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                        <input
                            className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none ${dark_mode ? 'bg-gray-700 text-white placeholder-gray-400 focus:border-teal-500' : 'bg-gray-100 text-gray-800 focus:border-teal-500'}`}
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none ${dark_mode ? 'bg-gray-700 text-white placeholder-gray-400 focus:border-teal-500' : 'bg-gray-100 text-gray-800 focus:border-teal-500'}`}
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
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
                        <input
                            className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none ${dark_mode ? 'bg-gray-700 text-white placeholder-gray-400 focus:border-teal-500' : 'bg-gray-100 text-gray-800 focus:border-teal-500'}`}
                            type="password"
                            name="password2"
                            placeholder="Confirm Password"
                            value={formData.password2}
                            onChange={handleChange}
                        />
                        <button
                            className={`mt-6 tracking-wide font-semibold py-4 rounded-lg ${dark_mode ? 'bg-teal-600 text-white hover:bg-teal-700' : 'bg-teal-500 text-white hover:bg-teal-600'} transition-colors duration-300`}
                        >
                            Register
                        </button>
                        {error && <p className="mt-3 text-red-500 text-center">{error}</p>}
                        <p className="mt-6 text-sm text-gray-600 text-center">
                            Already have an account?{" "}
                            <span className="text-teal-500 font-semibold cursor-pointer" onClick={() => navigate('/login')}>Login</span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;

