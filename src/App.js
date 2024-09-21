import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions).catch((error) => {
      console.error('Failed to fetch transactions:', error);
    });
  }, []);

  async function getTransactions() {
    const url = `${process.env.REACT_APP_API_URL}/transactions`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  }

  async function addNewTransaction(ev) {
    ev.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}`;
    const price = name.split(' ')[0];
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          price,
          name: name.substring(price.length + 1),
          description,
          datetime,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const newTransaction = await response.json();
      setName('');
      setDescription('');
      setDatetime('');
      setTransactions([...transactions, newTransaction]);
      console.log('Transaction added:', newTransaction);
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  }
  let balance = 0;

// Calculate total balance
for (const transaction of transactions) {
  balance += transaction.price;
}

// Format balance to 2 decimal places
balance = balance.toFixed(2);

// Split balance into integer and fraction parts
const [integerPart, fraction] = balance.split('.');

  return (
    <main>
      <h1>${integerPart}<span>{fraction}</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder={'+200 new samsung tv'}
            required
          />
          <input
            value={datetime}
            onChange={(ev) => setDatetime(ev.target.value)}
            type="datetime-local"
            required
          />
        </div>
        <div className="description">
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder={'description'}
            required
          />
        </div>
        <button type="submit">Add new transaction</button>
      </form>

      <div className="transactions">
        {transactions.length > 0 && transactions.map((transaction, index) => (
          <div className="transaction" key={index}>
            <div className="left">
              <div className="name">{transaction.name}</div>
              <div className="description">{transaction.description}</div>
            </div>
            <div className="right">
              <div className={`price ${transaction.price < 0 ? 'red' : 'green'}`}>
                {transaction.price}
              </div>
              <div className="datetime">
                {new Date(transaction.datetime).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
