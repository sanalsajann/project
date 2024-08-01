import React, { useState } from 'react';
import './Signuppage.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post("http://localhost:4002/events", { username, email, password });
      console.log(response);
      alert("Signup Successful")
      navigate('/login')
    } catch (error) {
      console.error(error);
      // Display a user-friendly error message
      alert("Error signing up. Please try again later.");
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}> 
        <h1>Signup</h1>
        <div className="input-box">
          <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
          <FaUser className='icon' size={20} />
        </div>
        <div className="input-box">
          <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <FaEnvelope className='icon' size={20} />
        </div>
        <div className="input-box">
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          <FaLock className='icon' size={20} />
        </div>
        <button type="submit">Signup</button>
        <div className="login-link">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Signup;