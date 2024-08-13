import { useAuth } from '../context/AuthContext'
import { useNavigate } from "react-router-dom"


export const useLogout = () => {
  const { LOGOUT } = useAuth()
  const navigate = useNavigate();


  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    LOGOUT()
    navigate('/Login')

  }

  return { logout }
}