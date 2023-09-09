import React, { useState } from 'react';

function Dashboard() {
  const [name, setName] = useState(localStorage.getItem('name'));
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/quizcategory/categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('userData', userData);
      } else {
        throw new Error('Data fetch failed');
      }
    } catch (err) {
      console.error('An error occurred:', err);
      setError('An error occurred while fetching data.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard</h1>
      {name && email ? (
        <>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <button
            type="submit"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? 'Fetching Data...' : 'Get Data'}
          </button>
        </>
      ) : (
        <p>Please log in to view your data.</p>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Dashboard;
