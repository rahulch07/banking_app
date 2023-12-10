import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Transactions from './components/Transactions';
import BankerLogin from './components/BankerLogin';
import BankerTransactions from './components/BankerTransactions';
import Navbar from './components/Navbar';
import Home from './components/Home';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [userId, setUserId] = useState(null);
  console.log('userId in App.js:', userId); // Add this line for debugging

  // useEffect(() => {
  //   // Redirect after setUserId has updated the state
  //   if (userId) {
  //     window.location.href = '/transactions';
  //   }
  // }, [userId]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
    if (userId) {
           window.location.href = '/transactions';
         }
  }, []);
  return (
    <div className="App">
      <Navbar/>
      <Router>
      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login setUserId={setUserId}/>} />
        {console.log("after login", userId)}
        <Route path="/transactions"
          element={<Transactions userId={localStorage.getItem('userId')} />} />
        <Route path="/banker-login" element={<BankerLogin/>} />
        <Route path="/banker-transactions" element={<BankerTransactions/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
