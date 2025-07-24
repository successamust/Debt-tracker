import React, { useEffect, useState } from 'react';
import './App.css';

const API_BASE = import.meta.env.VITE_API_BASE;

function App() {
  const [debts, setDebts] = useState([]);
  const [uniqueNames, setUniqueNames] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [total, setTotal] = useState(null);

  useEffect(() => {
    // Fetch all debts once to populate dropdown
    fetch(`${API_BASE}/all`)
      .then(res => res.json())
      .then(data => {
        setDebts(data);
        const names = new Set();
        data.forEach(d => {
          names.add(d.debtor);
          names.add(d.creditor);
        });
        setUniqueNames([...names]);
      });
  }, []);

  const fetchByRole = (role) => {
    if (!selectedName) return alert('Please select a name');
    fetch(`${API_BASE}/${role}/${selectedName}`)
      .then(res => res.json())
      .then(data => {
        setDebts(data);
        setTotal(null);
      });
  };
  
  const fetchTotal = (role) => {
    if (!selectedName) return alert('Please select a name');
    fetch(`${API_BASE}/total/${role}/${selectedName}`)
      .then(res => res.json())
      .then(data => {
        setDebts([]);
        setTotal(data.totalOwed);
      });
  };  

  const fetchAll = () => {
    fetch(`${API_BASE}/all`)
      .then(res => res.json())
      .then(data => {
        setDebts(data);
        setTotal(null);
      });
  };

  return (
    <div className="container">
      <h1>Debt Tracker</h1>

      <div className="controls">
        <label>
          Select Name:
          <select value={selectedName} onChange={e => setSelectedName(e.target.value)}>
            <option value="">-- Choose a name --</option>
            {uniqueNames.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>

        <div className="buttons">
          <button onClick={() => fetchByRole('debtor')}>Get Debts</button>
          <button onClick={() => fetchByRole('creditor')}>Get Creditors</button>
          <button onClick={() => fetchTotal('debtor')}>Get Total</button>
          <button onClick={fetchAll}>Get All Debts</button>
        </div>
      </div>

      <div className="results">
        {total !== null && (
          <p><strong>Total Owed by {selectedName} as debtor:</strong> ${total}</p>
        )}

        {debts.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Debtor</th>
                <th>Creditor</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {debts.map((debt, index) => (
                <tr key={index}>
                  <td>{debt.debtor}</td>
                  <td>{debt.creditor}</td>
                  <td>${debt.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {debts.length === 0 && total === null && <p>No data to display</p>}
      </div>
    </div>
  );
}

export default App;
