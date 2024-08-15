import { useState,  useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'



import { Link } from "react-router-dom"
import '../css/register.css'

const NewPassword = () => {
    const [error, setError] = useState(null)
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();
    const { LOGIN } = useAuth()



    useEffect(() => {
        const storedEmail = localStorage.getItem('resetEmail');
        if (storedEmail){
            setEmail(storedEmail);
        }else{
            navigate('/Login')
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://artprimes-backend.onrender.com/user/change_password`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email, newPassword }),
                credentials: 'include'
            });
            
            //This is where the error is coming from
            if(!response.ok){
                throw new Error('Password not strong enough or server error');
            }

            const json = await response.json();
            localStorage.removeItem('resetEmail')
            LOGIN(json)
            navigate('/Home')

        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <div className='signup-container'>
             <div className='container'>
                 <h1>ArtPrimes</h1>
                 <h2>{email} enter your new password here...</h2>


                 <form onSubmit={handleSubmit}>
                     <input
                        type='password'
                        placeholder='Enter Your New Password here...'
                        value={newPassword}
                        required
                        onChange={(e)=> setNewPassword(e.target.value)}
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

export default NewPassword;
