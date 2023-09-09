import React, { useState } from 'react';
import './home.css';
//import useFatch from '../../hooks/useFatch';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  //const { data, loading, error, reFetch } = useFatch('http://localhost:5000/api/auth/user/register'); // Initialize the custom hook with the signup endpoint

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
     
      if (response.ok) {
        console.log('response1',response)
        const responseData = await response.json();
        console.log('Signup successful');
        console.log('Response Data:', responseData);
        navigate('/login');
      } else {
        const errorMessage = await response.text(); 
        console.error('Signup failed. Status Code:', response.status);
        console.error('Error Message:', errorMessage);
        window.alert(`Status: ${response.status}\nMessage: ${errorMessage}`);
      }
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <div className="signup-container">
      <h1>Happy Student Signup</h1>
      <form id="signup-form" onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Your Password"
            required
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Home;
