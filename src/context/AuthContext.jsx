import { createContext, useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const localData = localStorage.getItem('user');
        return localData ? JSON.parse(localData) : null;
    });
    const [authError, setAuthError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [newPassword, setNewPassword ] = useState(null)

    // const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt_token\s*=\s*([^;]*).*$)|^.*$/, "$1");

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const SIGNUP = (email) => {
        setUser({ email });
    }

    const LOGIN = async (email) => {
        setUser({ email });

    };

    const LOGOUT = async () => {
        try {
            const response = await fetch('https://artprimes-backend.onrender.com/user/logout', {
                method: 'GET',
                credentials: 'include', // Include cookies in the request
            });

            if (!response.ok) {
                throw new Error('Failed to log out');
            }

            // Set user to null after successful logout
            setUser(null);
            setAuthError(null); // Clear any authentication errors
        } catch (err) {
            setAuthError('Failed to log out. Please try again.', err.message); // Set an error message
        }
    }

    const RESETPASSWORD = async (email) => {
        setNewPassword(email)
    }

    return (
        <AuthContext.Provider value={{ user, SIGNUP, LOGIN, LOGOUT, RESETPASSWORD }}>
            {children}
        </AuthContext.Provider>
    );
}
