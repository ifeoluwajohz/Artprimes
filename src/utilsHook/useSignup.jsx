import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const { SIGNUP } = useAuthContext()

  const navigate = useNavigate();

  const signup = async (fullname, email, password) => {
    setError(null)

    const response = await fetch('http://localhost:7000/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ fullname, email, password }),
      credentials: 'include'
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.err)
    }
    if (response.ok) {
      SIGNUP(json)

      navigate('/Home')
    }
  }

  return { signup, error }
}