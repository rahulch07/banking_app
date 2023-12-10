// frontend/src/components/BankerLogin.js
import React, { useState } from 'react';
import api from '../services/api';

const BankerLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleBankerLogin = async () => {
    try {
      const response = await api.post('/users/login', { username, password });
      //const accessToken = response.data.accessToken;
      // Store the accessToken securely (e.g., in cookies or localStorage)
      // Redirect or perform any other action after successful login

      if (response && response.data) {
        console.log('Login Response:', response);
      const accessToken = response.data.accessToken;
      console.log(accessToken);
      // Store the accessToken securely (e.g., in cookies or localStorage)
      localStorage.setItem('accessToken', accessToken);

      //Call setUserId to update userId in the App.js
      //setUserId(response.data.userId);
      //localStorage.setItem('userId', response.data.userId);
      ////console.log("here");
      //console.log(response.data.userId);
      //console.log(response.data.role);
      // Redirect or perform any other action after successful login
      if(response.data.role==='banker'){
      window.location.href = '/banker-transactions';
      }
    } else {
        console.error('Login failed. Response or response.data is undefined.');
      }

    } catch (error) {
      console.error('Banker login failed', error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Banker Login</h2>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleBankerLogin}>Login</button>
    </div>
  );
};

export default BankerLogin;
