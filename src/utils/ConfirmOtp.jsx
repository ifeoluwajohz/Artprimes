import { useState,  useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../utilsHook/useAuthContext'


import { Link } from "react-router-dom"
import '../css/register.css'

const ConfirmOTP = () => {
    const [error, setError] = useState(null)
    const [email, setEmail] = useState('')
    const [code, setOTP] = useState('');
    const navigate = useNavigate();
    const { dispatch } = useAuthContext()


    useEffect(() => {
        const storedEmail = localStorage.getItem('resetEmail');
        if (storedEmail){
            setEmail(storedEmail);
        }else{
            navigate('/Signup')
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://artprimes-backend.onrender.com/user/confirm_otp`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email, code }),
            });
            
            //This is where the error is coming from
            if(!response.ok){
                throw Error('Incorrect otp or email compromised')
            }

            const json = await response.json();
            navigate('/NewPassword')
            dispatch({type: 'confirmOtpSuccess', payload: json})
            setError(null);
        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <div className='signup-container'>
             <div className='container'>
                 <h1>ArtPrimes</h1>
                 <h2>confirm code sent to {email}</h2>


                 <form onSubmit={handleSubmit}>
                     <input
                        type='number'
                        placeholder='Otp code...'
                        value={code}
                        required
                        onChange={(e)=> setOTP(e.target.value)}
                    />
                    <br />
                    <button type='submit' className='submit'>Submit</button>
                    <br />
                    {error && <span className='error'>{error}</span>}
                </form>
                <Link className='Link' to='/ForgetPassword'><h4 className='changemail'>Change mail address?</h4></Link>
            </div>
        </div>
    );
};

export default ConfirmOTP;
