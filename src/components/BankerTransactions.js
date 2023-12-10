import React from 'react'
import api from '../services/api';
import { useState, useEffect } from 'react';

const BankerTransactions =() => {

  const [response, setResponse] = useState([]);
  // const [userName, setUserName] = useState("");
  // const [balance, setBalance] = useState("");

  const fetchTransactions = async () => {
    try {
      const response = await api.get(`/accounts/transactions`);
      //console.log(response.data);
      setResponse(response.data);
      // setTransactions(response.data.transactions);
      // setUserName(response.data.username);
      // setBalance(response.data.balance);
      //const balanceResponse = await api.get(`/accounts/${userId}/balance`);
      //setTransactions(response.data);
      //setBalance(balanceResponse.data.balance);
    } catch (error) {
      console.error('Error fetching transactions', error.response?.data.message || 'An error occurred');
    }
  };


  useEffect(() => {
  fetchTransactions();
  }, []);
  return (
    <div>
      <h1>User Records</h1>
      <ul>
        {response.map((element) =>{
          
          return(
            <div key={element._id} id='recdcont'>
            <h2 style={{marginTop:10, marginBottom:10}}>{element.username}</h2>
            <h3 style={{marginTop:10, marginBottom:10}}>Transactions</h3>
            <p>Balance: ₹{element.balance}</p>
            <ul id='transactions'>
             {element.transactions.map((element1) => {
               //console.log(element.balance);
                return (
                 <li key={element1._id}>
                  Transaction type <span style={{fontWeight:'bold'}}>{element1.type}</span>: <span style={{fontWeight:'bold'}}>₹{element1.amount}</span> on {new Date(element1.timestamp).toLocaleString()}.
                 </li>
                );
              })}
            </ul>
            </div>
          );
        })}
      </ul>
    </div>
  )
}

export default BankerTransactions;
