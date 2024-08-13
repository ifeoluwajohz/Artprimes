import React, { useState } from 'react';
import { useAuthContext } from '../utilsHook/useAuthContext';
import { useAccount_update } from '../context/Account_update_context';
import "../style/settings.css";

const Account_update = () => {
  const { userInfo, update_userInfo, isLoading, error, success } = useAccount_update();
  
  const [newName, setNewName] = useState(userInfo.fullname);
  const [tel_number, setTel_number] = useState(userInfo.tel_number);
  const [username, setUsername] = useState(userInfo.username);
  const [newAddress, setNewAddress] = useState(userInfo.home_address);
  const [newGender, setNewGender] = useState(true); // Assuming gender is already a boolean in userInfo

  const handleSubmit = (e) => {
    e.preventDefault();
    update_userInfo(newName, username, tel_number, newAddress, newGender);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='account_info'>
        <h1>Update your account profile</h1>
        
        {isLoading && <p>Loading...</p>}
        <div className='form-flex'>
          <p>Fullname</p>
          <input type="text" required
            value={newName} onChange={(e) => setNewName(e.target.value)}
            className='fullname'
          />
          <br />
          <p>Mobile Number</p>
          <input type="number" required
            value={tel_number} onChange={(e) => setTel_number(e.target.value)}
            className='tel_number'
          />
          <br />
          <p>Username</p>
          <input type="text"
            value={username} onChange={(e) => setUsername(e.target.value)}
            className='userName'
          />
          <br />
          <p>Home Address</p>
          <input type="text" required
            value={newAddress} onChange={(e) => setNewAddress(e.target.value)}
            className='userAddress'
          />
          <br />
          <p>Gender</p>
          <input type="text" 
            // value={newGender} onChange={(e) => setNewGender(e.target.value)}
            className='userGender'
          />
          <br/>
        </div>

        <button type="submit" disabled={isLoading}>Save and apply</button>
        {error && <p className="error-message">{error}</p>} {/* Display the error message */}
        {success && <p className="success-message">{success}</p>} {/* Display the success message */}
      </form>
    </>
  );
}

export default Account_update;
