import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleBack = () => {
    history.push('/');
  };

  const handleRegister = async () => {
    const url = "http://localhost:8081/api/v1/auth/register";
    const body = {
      firstName,
      middleName,
      lastName,
      username,
      password,
      email,
      age,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Error registering. Please try again.');
      }
      
      history.push('/');
    } catch (error) {
      setError('Error registering. Please try again.');
    }
  };

  return (
    <div className="background-image">
      <h1 className="login-heading">We are Cinema City and we offer only the highest quality Experience</h1>
      <div className="login-form">
        <form>
          <label className="form-label">
            First Name:
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-input" />
          </label>
          <label className="form-label">
            Middle Name:
            <input type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} className="form-input" />
          </label>
          <label className="form-label">
            Last Name:
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-input" />
          </label>
          <label className="form-label">
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-input" />
          </label>
          <label className="form-label">
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" />
          </label>
          <label className="form-label">
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
          </label>
          <label className="form-label">
            Age:
            <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="form-input" />
          </label>
          {error && <div className="error-label">{error}</div>}
          <button type="button" onClick={handleBack} className="login-button">
            Back
          </button>
          <button className="register-button" type="button" onClick={handleRegister}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
