import { createContext, useState, useEffect, useContext } from 'react';
import { useAuthContext } from '../utilsHook/useAuthContext';

export const Account_update = createContext();
export const useAccount_update = () => useContext(Account_update);

export const Account_updateProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);  // State for success message
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchUserinfo = async () => {
            setisLoading(true);
            try {
                const response = await fetch('https://artprimes-backend.onrender.com/user/settings/account_info', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUserInfo(data);
                setError(null);
            } catch (err) {
                setisLoading(false);
                setError('Error fetching user information.', err.message);
            } finally {
                setisLoading(false);
            }
        };

        fetchUserinfo();
    }, []);

    const update_userInfo = async (newName, username, tel_number, newAddress, newGender) => {
        const data = {
            fullname: newName,
            tel_number: tel_number,
            username: username,
            home_address: newAddress,
            gender: newGender
        };

        try {
            const url = `https://artprimes-backend.onrender.com/user/settings/account_update`;

            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorMsg = await response.text();
                throw new Error(`Failed to update user info: ${errorMsg}`);
            }

            const responseData = await response.json();
            setUserInfo(responseData);  // Update the user info with the response data
            setError(null);             // Clear any previous errors
            setSuccess('User information updated successfully!');  // Set success message
        } catch (err) {
            console.log(err.message)
            setError(err.message);
            setSuccess(null); // Clear any previous success messages
        }
    };

    return (
        <Account_update.Provider value={{ userInfo, update_userInfo, isLoading, error, success }}>
            { children }
        </Account_update.Provider>
    );
};
