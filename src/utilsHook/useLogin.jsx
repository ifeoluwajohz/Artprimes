import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useAuthContext } from './useAuthContext'


export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { LOGIN } = useAuthContext();
  const navigate = useNavigate();


  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('https://artprimes-backend.onrender.com/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password }),
      credentials: 'include'

    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.err)
      navigate('/Login')
    }

    if (response.ok) {
      LOGIN(json)
      navigate('/Home')

      // update loading state
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}
