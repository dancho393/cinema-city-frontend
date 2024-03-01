// Login.jsx
import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login logic here
    console.log('Logging in with:', { username, password });
  };

  const handleRegister = () => {
    // Add your register logic here
    console.log('Registering with:', { username, password });
  };

  return (
    <div className="background-image">
      <h1 className="login-heading">We are Cinema City and we offer only highest quality expirience</h1>
      <div className="login-form">
        <form>
          <label className="form-label">
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input username-input"
            />
          </label>
          <label className="form-label">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input password-input"
            />
          </label>
          <button type="button" onClick={handleLogin} className="login-button">
            Login
          </button>
        </form>

        {/* Register button */}
        <button className="register-button" type="button" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
