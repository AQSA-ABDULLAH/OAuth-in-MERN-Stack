import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import axios from 'axios';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
    
        if (!email || !password) {
            return handleError('Email and password are required');
        }
    
        try {
            const response = await axios.post("https://o-auth-in-mern-stack-qdbhh9grm-aqsa-abdullahs-projects.vercel.app/", { email, password });

            const { status, message, token, error } = response.data;

            if (status === 'success') {
                console.log('Token:', token);
                handleSuccess(message);
                localStorage.setItem('token', token);  // Save token to localStorage
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else if (error) {
                handleError(error.details[0]?.message || 'An error occurred');
            } else {
                handleError(message);
            }
        } catch (err) {
            // Handle different error scenarios
            if (err.response) {
                // Server responded with an error status
                if (err.response.status === 404) {
                    handleError('API endpoint not found (404). Please check the URL.');
                } else {
                    handleError(err.response.data.message || 'An error occurred');
                }
            } else if (err.request) {
                // No response was received
                handleError('No response from server. Please check your network or server status.');
            } else {
                // Any other errors during request setup
                handleError('Failed to log in');
            }
        }
    };

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={loginInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={loginInfo.password}
                    />
                </div>
                <button type='submit'>Login</button>
                <span>Doesn't have an account?
                    <Link to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;




