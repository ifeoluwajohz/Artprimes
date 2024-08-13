import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom';


export const useForgetPassword = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const navigate = useNavigate();


  const forgetPassword = async (email) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:7000/user/forget_password', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      dispatch({type: 'forgotPasswordSuccess', payload: json})
      setIsLoading(false)
      navigate('/ConfirmOtp')

    }
  }

  return { forgetPassword, isLoading, error }
}