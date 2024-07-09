import React, { useState } from 'react';
import { Navigate,useNavigate } from "react-router-dom";
import axios from 'axios';
import './Register.css'; // Assuming you will add styles here

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [walletId, setWalletId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userID, setUserID] = useState('');
  const [referralID, setReferralID] = useState('');
  const [coinCount, setCoinCount] = useState(0);
  const [ownReferralID, setOwnReferralID] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const user = {
      email,
      walletId,
      password,
      userID,
      referralID,
      coinCount,
      ownReferralID
    };

    try {
      const response = await axios.post(`http://localhost:3001/auth/register`, user);
      alert('Registration successful');
      // Handle success, redirect to login page or clear the form
      if (response) {
        console.log(response)
        navigate("/login")
      } 
    } catch (error) {
       alert(error.response.data.message);
      console.error('Error during registration:', error);
      console.log(error.response.data.message)
     
      
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2 className="register-title">Register</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="walletId">Wallet-ID</label>
          <input
            type="text"
            id="walletId"
            value={walletId}
            onChange={(e) => setWalletId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="referralID">Referral ID</label>
          <input
            type="text"
            id="referralID"
            value={referralID}
            onChange={(e) => setReferralID(e.target.value)}
          />
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
