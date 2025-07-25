import React, { useEffect, useState } from 'react';
import './App.css';

const API_BASE = import.meta.env.MODE === 'development' ?  "http://localhost:3000" : import.meta.env.VITE_API_BASE

function App() {
  const [debts, setDebts] = useState([]);
  const [uniqueNames, setUniqueNames] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false); // </-- loading state

  useEffect(() => {
    setLoading(true);
    // Fetch all debts to populate dropdown
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
      })
      .finally(() => setLoading(false));
  }, []);

  const fetchByRole = (role, name=selectedName) => {
    if (!name) return alert('Please select a name');
    setLoading(true);
    fetch(`${API_BASE}/${role}/${name}`)
      .then(res => res.json())
      .then(data => {
        setDebts(data);
        setTotal(null);
      })
      .finally(() => setLoading(false));
  };

  const fetchTotal = () => {
    if (!selectedName) return alert('Please select a name');
    setLoading(true);
    fetch(`${API_BASE}/totalsummary/${selectedName}`)
      .then(res => res.json())
      .then(data => {
        setDebts([]);
        setTotal(data);
      })
      .finally(() => setLoading(false));
  };

  const reset = () => {
    setSelectedName('');
    setLoading(true);
    fetch(`${API_BASE}/all`)
      .then(res => res.json())
      .then(data => {
        setDebts(data);
        setTotal(null);
      })
      .finally(() => setLoading(false));
  };

  const selectName = (e) => {
    setSelectedName(e.target.value);
    fetchByRole('debtor', e.target.value);
  };

  return (
    <div className="container">
      <h1>Debt Tracker</h1>

      <div className="main-content">
        <div className="controls">
          <label>
            Select Player:
            <select value={selectedName} onChange={selectName}>
              <option value="">-- Choose a player --</option>
              {uniqueNames.map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </label>

          <div className="buttons">
            <button onClick={() => fetchByRole('debtor')}>Get Debts</button>
            <button onClick={() => fetchByRole('creditor')}>Get Credits</button>
            <button onClick={fetchTotal}>Get Total</button>
            <button onClick={reset}>Reset</button>
          </div>
        </div>

        <div className="results">
          {loading && (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <span>Loading...</span>
            </div>
          )}
          {!loading && total !== null && (
            <div className="totals">
              <p><strong>{selectedName} owes others:</strong> ${total.totalOwedBy.toFixed(2)}</p>
              <p><strong>Others owe {selectedName}:</strong> ${total.totalOwedTo.toFixed(2)}</p>
            </div>
          )}

          {!loading && debts.length > 0 && (
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
                    <td>${debt.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loading && debts.length === 0 && total === null && <p>No data to display</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
