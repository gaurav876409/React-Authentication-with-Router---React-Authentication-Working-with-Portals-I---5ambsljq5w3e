import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }

    const { email: storedEmail, password: storedPassword } = JSON.parse(user);
    if (email !== storedEmail || password !== storedPassword) {
      return;
    }

    setEmail('');
    setPassword('');
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <Redirect to="/store" />;
  }

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {isSubmitted && (email === '' || password === '') && (
          <p className="error-para">Email or password isn't entered!</p>
        )}
        {isSubmitted && email !== '' && password !== '' && (
          <p className="error-para">Email or password is invalid</p>
        )}
        <div className="email-div">
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="password-div">
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="login-btn">
          Log In
        </button>
      </form>
      <div>
        Don't have an account? <Link to="/">Register</Link>
      </div>
    </div>
  );
};

export default Login;

