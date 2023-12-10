// frontend/src/components/Login.js
import React, { useState} from 'react';
import api from '../services/api';

const Login = ({setUserId}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/users/login', { username, password });
      console.log(username);
  console.log(password);
  console.log("Hello");
      // Check if 'response' and 'response.data' are defined before accessing
      if (response && response.data) {
        console.log('Login Response:', response);
      const accessToken = response.data.accessToken;
      console.log(accessToken);
      // Store the accessToken securely (e.g., in cookies or localStorage)
      localStorage.setItem('accessToken', accessToken);

      //Call setUserId to update userId in the App.js
      setUserId(response.data.userId);
      localStorage.setItem('userId', response.data.userId);
      console.log("here");
      console.log(response.data.userId);
      console.log(response.data.role);
      // Redirect or perform any other action after successful login
      if(response.data.role==='customer'){
      window.location.href = '/transactions';
      }
    } else {
        console.error('Login failed. Response or response.data is undefined.');
      }
    } catch (error) {
      // Log the entire error object for debugging
      console.error('Login failed', error);

      // Check if 'error.response' is defined before accessing its properties
      if (error.response && error.response.data && error.response.data.message) {
        console.error('Error message:', error.response.data.message);
      } else {
        console.error('An error occurred while handling the login request.');
      }
    }
  };

  

  return (
    <div>
      <h2>Login</h2>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
