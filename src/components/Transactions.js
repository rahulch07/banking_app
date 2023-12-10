// frontend/src/components/Transactions.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

// const Transactions = ({ userId }) => {
//   const [transactions, setTransactions] = useState([]);
//   const [amount, setAmount] = useState('');

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const response = await api.get(`/accounts/${userId}/transactions`);
//         setTransactions(response.data);
//       } catch (error) {
//         console.error('Error fetching transactions', error.response.data.message);
//       }
//     };

//     fetchTransactions();
//   }, [userId]);

//   const handleDeposit = async () => {
//     try{
//     // Implement deposit logic
//     const response = await api.post(`/accounts/${userId}/deposit`, { amount });
//       console.log('Deposit successful:', response.data);
//       // Optionally, update the transactions state or perform other actions
//     } catch (error) {
//       console.error('Deposit failed', error.response.data.message);
//     }
//   };

//   const handleWithdrawal = async () => {
//     try{
//     // Implement withdrawal logic
//     const response = await api.post(`/accounts/${userId}/withdrawal`, { amount });
//       console.log('Withdrawal successful:', response.data);
//       // Optionally, update the transactions state or perform other actions
//     } catch (error) {
//       console.error('Withdrawal failed', error.response.data.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Transactions</h2>
//       <ul>
//         {transactions.map((transaction) => (
//           <li key={transaction.timestamp}>
//             {transaction.type}: {transaction.amount} on {new Date(transaction.timestamp).toLocaleString()}
//           </li>
//         ))}
//       </ul>
//       <label>Amount:</label>
//       <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
//       <br />
//       <button onClick={handleDeposit}>Deposit</button>
//       <button onClick={handleWithdrawal}>Withdraw</button>
//     </div>
//   );
// };

// export default Transactions;

const Transactions = ({ userId }) => {
  console.log("here2");
  console.log(userId);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [transactionType, setTransactionType] = useState('deposit');
  const [amount, setAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setAlert] = useState(false);

  
    const fetchTransactions = async () => {
      try {
        const response = await api.get(`/accounts/${userId}/transactions`);
        const balanceResponse = await api.get(`/accounts/${userId}/balance`);
        setTransactions(response.data);
        setBalance(balanceResponse.data.balance);
      } catch (error) {
        console.error('Error fetching transactions or balance', error.response?.data.message || 'An error occurred');
      }
    };


    useEffect(() => {
    fetchTransactions();
    }, [userId]);

    // const alertVisible = () =>{
    //   if(transactionType==='withdraw'&& amount>balance){
    //     setAlert(true);
    //   }

  const handleTransaction = async () => {
    try {

      //alertVisible();
      

      const response = await api.post(`/accounts/${userId}/${transactionType}`, { amount });
      // Check if the response has a valid transactions array
      if (Array.isArray(response.data.transactions)) {
      setTransactions(response.data.transactions);
    } else {
      console.error('Invalid transactions data in the response');
      // Handle the error, maybe set an empty array or show an error message
    }
      setBalance(response.data.balance);

      console.log(transactionType);
      console.log(amount);
      console.log(balance);

      if(transactionType==='withdrawal' && amount>balance){
        setAlert(true);
        // Display an alert
      //alert('Insufficient funds. Cannot complete withdrawal.');

      }
      console.log(response);

      console.log(showAlert);
      //new
      handleCloseModal();
      // Manually fetch transactions again to update the component
    fetchTransactions();
    } catch (error) {
      console.error('Transaction failed', error.response?.data.message || 'An error occurred');
      //console.log(error);
      setAlert(true);
    }
  };

  const handleOpenModal = (type) => {
    setTransactionType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setTransactionType(null);
    setShowModal(false);
    setAmount(0);
  };

  const closeAlert =()=>{
    setAlert(false);
  }

  return (
    <div>
      
      <h2>Transactions</h2>
      <p>Balance: ₹{balance}</p>
      <ul id='transactions'>
      {transactions.map((element) => {
        //console.log(element.balance);
          return (
            <li key={element._id}>
             Transaction type <span style={{fontWeight:'bold'}}>{element.type}</span>: <span style={{fontWeight:'bold'}}>₹{element.amount}</span> on {new Date(element.timestamp).toLocaleString()}. 
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={() => handleOpenModal('deposit')}>Deposit</button>
        <button onClick={() => handleOpenModal('withdrawal')}>Withdraw</button>
      </div>
      {/* <label>Amount:</label>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <br />
      <button onClick={handleTransaction}>Submit</button> */}

       {showModal && (
        <div className="modal">
          <div className="modal-content">
            
            <p>Balance: ₹{balance}<span className="close" onClick={handleCloseModal} id='cross'>
              &times;
            </span></p>
            <label>Amount:</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <br />
            <button onClick={handleTransaction}>Submit</button>
          </div>
        </div>
      )}

      { showAlert &&(
        <div className="alert" >
        <strong>Warning!</strong> Blance is insufficient!!
        <button className="close" onClick={closeAlert}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      )}
    </div>
  );
};

export default Transactions;
{/* <div>
      {console.log(transactions_list[0])}
      <h2>Transactions</h2>
      <p>Balance: ${balance}</p>
      <ul>
        {transactions_list.map((transaction_list) => (
          
          <li key={transaction_list.transactions.timestamp}>
            {transaction_list.transaction.type}: {transaction_list.transaction.amount} on {new Date(transaction_list.transaction.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setTransactionType('deposit')}>Deposit</button>
        <button onClick={() => setTransactionType('withdrawal')}>Withdraw</button>
      </div>
      <label>Amount:</label>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <br />
      <button onClick={handleTransaction}>Submit</button>
    </div> */}