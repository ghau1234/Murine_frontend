import React, { useState, useEffect } from 'react';
import { Link, json, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/auth/login`, {
        email,
        password
      });

      const data = response.data;

      console.log('Login successful:', data);

      // Store the token in session storage
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('login_info',JSON.stringify(data))

      // Check the role and navigate accordingly
      if (data.user.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        console.error('Login failed:', error.response.data.message);
        // Handle login failure (e.g., show error message)
      } else {
        console.error('An error occurred:', error.message);
        // Handle network or other errors
      }
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Sign Up clicked');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Login</h2>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" className="login-button">Login</button>
          <h2>New User?</h2>
          <Link to="/register">
            <button type="button" className="signup-button">Sign Up</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
