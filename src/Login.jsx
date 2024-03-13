import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const url = "http://localhost:8081/api/v1/auth/authenticate";  
      const body = {
        username: username,
        password: password
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

    
      if (response.ok) {
        const responseData = await response.json();
        const jwtToken = responseData.jwtToken;
  
        // Pass only the token value as state
        history.push({
          pathname: "/logged",
          state: { token: jwtToken }
        });
        
      } else {
        console.log(response);

        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      
      setError('An error occurred. Please try again later.');
    }
  };

  const handleRegister = () => {
    // Redirect to register page
    history.push('/register');
  };

  return (
    <div className="background-image">
      <h1 className="login-heading">We are Cinema City and we offer only the highest quality Experience</h1>
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

          {/* Error label */}
          {error && <div className="error-label">{error}</div>}

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
