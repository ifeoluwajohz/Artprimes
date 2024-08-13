import {useState} from 'react'
import { Link } from "react-router-dom"
import { useSignup } from '../utilsHook/useSignup'
import '../css/register.css'


const Signup = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(fullname, email, password)
    }
    return(
        <div className='signup-container'>
            <div className='container'>
                <h1>ArtPrimes</h1>
                <h2>Set up your <span>account</span> in a minute</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Full name...'
                        value={fullname}
                        required
                        onChange={(e)=> setFullname(e.target.value)}
                    />
                    <br />
                    <input
                        type='email'
                        placeholder='Email address...'
                        value={email}
                        required
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                    <br />
                    <input
                        type='password'
                        placeholder='Enter password...'
                        value={password}
                        required
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                    <br />
                    <button type='submit' className='submit'>Sign up</button><br/>
                    {error && <span className='error'>{error}</span>}
                </form>
                <Link className='Link' to="/Login"><h4 className='changemail'>Already a member ? <span>Log in</span></h4></Link>
            </div>
        </div>
    )
}
export default Signup 