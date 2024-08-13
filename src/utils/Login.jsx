import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../utilsHook/useLogin'

import { useAuth } from '../context/AuthContext';
import '../css/register.css';

const Login = () => {
    const { LOGIN, authError, isLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error } = useLogin()


    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div className='signup-container'>
            <div className='container'>
                <h1>ArtPrimes</h1>
                <h2>Login to your account</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type='email'
                        placeholder='Email address...'
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <input
                        type='password'
                        placeholder='Enter password...'
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <button type='submit' className='submit' disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    <br />
                    {authError && <span className='error'>{authError}</span>}
                </form>
                <Link className='Link' to="/Signup">
                    <h4 className='newuser'>Don't have an account? <span>Sign up</span></h4>
                </Link>
                {error && <span className='error'>{error}</span>}
                <Link className='Link' to="/ForgetPassword">
                    <p>Forget password?</p>
                </Link>
            </div>
        </div>
    );
};

export default Login;
