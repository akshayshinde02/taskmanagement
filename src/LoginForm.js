import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin(username, password);
  };

  return (
        <div style={styles.container}>
          <h2 style={styles.title}>Login</h2>
          <label style={styles.label}>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </label>
          <br />
          <label style={styles.label}>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </label>
          <br />
          <button onClick={handleLogin} style={styles.button}>
            Login
          </button>
        </div>
      );
};

const styles = {
    container: {
      width: '300px',
      margin: 'auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '1.5rem',
      marginBottom: '20px',
      textAlign: 'center',
    },
    label: {
      display: 'block',
      marginBottom: '10px',
    },
    input: {
      width: '100%',
      padding: '8px',
      boxSizing: 'border-box',
    },
    button: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px 15px',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer',
    },
  };

export default LoginForm;
