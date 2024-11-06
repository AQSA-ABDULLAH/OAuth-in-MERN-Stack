import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import axios from 'axios';


function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''  
    });

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { userName, email, password, confirmPassword } = signupInfo;
        
        // Validation for empty fields and password match
        if (!userName || !email || !password || !confirmPassword) {
            return handleError('All fields are required');
        }
        if (password !== confirmPassword) {
            return handleError('Passwords do not match');
        }
    
        try {
            const response = await axios.post("https://o-auth-in-mern-stack-9rwm.vercel.app/api/user/signup", { userName, email, password, confirmPassword });
            console.log (response)
            const { success, message, error } = response.data;
            
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else if (error) {
                handleError(error.details?.[0]?.message || "Signup error");
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError("An error occurred during signup");
            console.error("Error during signup:", err);
        }
    };
    

    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='userName'
                        autoFocus
                        placeholder='Enter your name...'
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                    />
                </div>
                <div>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='confirmPassword'
                        placeholder='Confirm your password...'
                        value={signupInfo.confirmPassword}
                    />
                </div>
                <button type='submit'>Signup</button>
                <span>Already have an account ?
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup;
