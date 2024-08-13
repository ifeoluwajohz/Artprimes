import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'


import '../css/register.css'


const ForgetPassword = () => {
    const [error, setError] = useState(null)
    const [email, setEmailState] = useState('');
    const { RESETPASSWORD } = useAuth()


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:7000/user/forget_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                
                throw new Error('Email not found or server error');
            }

            // setEmail(email);
            localStorage.removeItem('user')
            localStorage.setItem('resetEmail', email);

            const json = await response.json();
            RESETPASSWORD(email)
            setError(null);
            navigate('/ConfirmOtp')
        } catch (error) {
            setError(error.message)
            // Handle error display or feedback to the user
        }
    };

    return (
        <div className='signup-container'>
             <div className='container'>
                 <h1>ArtPrimes</h1>
                 <h2>Enter your Email address</h2>

                 <form onSubmit={handleSubmit}>
                     <input
                        type='email'
                        placeholder='Email address...'
                        value={email}
                        required
                        onChange={(e)=> setEmailState(e.target.value)}
                    />
                    <br />
                    <button type='submit' className='submit'>Submit</button>
                    <br />
                    {error && <span className='error'>{error}</span>}

                </form>
                <Link className='Link' to="/Signup"><h4 className='newuser'>Dont have an account ? <span>Sign up</span></h4></Link>
            </div>
        </div>
    );
};

export default ForgetPassword;
